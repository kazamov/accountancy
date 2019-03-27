import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { User, UserInfo } from 'firebase/app';

import {
	ICredentials,
	ISignInProcess,
	ISignUpProcess
} from '../interfaces/main.interface';
import {
	defaultAuthFirebaseUIConfig,
	NgxAuthFirebaseUIConfig
} from '../interfaces/config.interface';
import { FirestoreSyncService } from './firestore-sync.service';
import { Accounts } from '../enums';

import UserCredential = firebase.auth.UserCredential;
import { NgxAuthFirebaseUIConfigToken } from '../auth-config.token';
import { AuthStore } from '../state/auth.store';
import { AuthQuery } from '../state/auth.query';
import { AppUserInfo } from '../interfaces/app-user-info.interface';

export const facebookAuthProvider = new firebase.auth!.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth!.GoogleAuthProvider();
export const twitterAuthProvider = new firebase.auth!.TwitterAuthProvider();
export const githubAuthProvider = new firebase.auth!.GithubAuthProvider();

export enum AuthProvider {
	ALL = 'all',
	ANONYMOUS = 'anonymous',
	EmailAndPassword = 'firebase',
	Google = 'google',
	Facebook = 'facebook',
	Twitter = 'twitter',
	Github = 'github',
	PhoneNumber = 'phoneNumber'
}

@Injectable()
export class AuthProcessService implements ISignInProcess, ISignUpProcess {
	onSuccessEmitter: EventEmitter<any> = new EventEmitter<any>();
	onErrorEmitter: EventEmitter<any> = new EventEmitter<any>();

	isLoading = false;
	emailConfirmationSent = false;

	emailToConfirm = '';
	messageOnAuthSuccess = '';
	messageOnAuthError = '';

	constructor(
		@Inject(NgxAuthFirebaseUIConfigToken)
		public config: NgxAuthFirebaseUIConfig,
		public afa: AngularFireAuth,
		private _snackBar: MatSnackBar,
		private _fireStoreService: FirestoreSyncService,
		private authStore: AuthStore,
		private authQuery: AuthQuery,
		private router: Router
	) {
		this.config = Object.assign(defaultAuthFirebaseUIConfig, this.config);

		this.authStore.setLoading(true);
		this.afa.authState.subscribe(user => {
			const userData: AppUserInfo | null = user
				? this.parseUserInfo(user)
				: null;
			this.authStore.update({
				userData: userData
			});
			this.authStore.setLoading(false);
		});

		this.authQuery.isAuthenticated$.subscribe(isAuthenticated => {
			if (isAuthenticated) {
				if (this.router.url.search(/auth/i) !== -1) {
					this.router.navigate(['/charges']);
				}
			} else {
				if (this.router.url.search(/auth/i) === -1) {
					this.router.navigate(['/auth']);
				}
			}
		});
	}

	/**
	 * Reset the password of the ngx-auth-firebaseui-user via email
	 *
	 * @param email - the email to reset
	 * @returns
	 */
	public resetPassword(email: string) {
		return this.afa.auth
			.sendPasswordResetEmail(email)
			.then(() => console.log('email sent'))
			.catch(error => this.onErrorEmitter.next(error));
	}

	/**
	 * General sign in mechanism to authenticate the users with a firebase project
	 * using a traditional way, via username and password or by using an authentication provider
	 * like google, facebook, twitter and github
	 *
	 * @param provider - the provider to authenticate with (google, facebook, twitter, github)
	 * @param credentials
	 * @returns
	 */
	public async signInWith(
		provider: AuthProvider,
		credentials?: ICredentials
	) {
		console.log('this.config on signInWith', this.config);
		try {
			this.isLoading = true;
			let signInResult: UserCredential | any;

			switch (provider) {
				case AuthProvider.ANONYMOUS:
					signInResult = (await this.afa.auth.signInAnonymously()) as UserCredential;
					break;

				case AuthProvider.EmailAndPassword:
					if (credentials) {
						signInResult = (await this.afa.auth.signInWithEmailAndPassword(
							credentials.email,
							credentials.password
						)) as UserCredential;
					} else {
						throw new Error('Credentials not provided');
					}

					break;

				case AuthProvider.Google:
					signInResult = (await this.afa.auth.signInWithPopup(
						googleAuthProvider
					)) as UserCredential;
					break;

				case AuthProvider.Facebook:
					signInResult = (await this.afa.auth.signInWithPopup(
						facebookAuthProvider
					)) as UserCredential;
					break;

				case AuthProvider.Twitter:
					signInResult = (await this.afa.auth.signInWithPopup(
						twitterAuthProvider
					)) as UserCredential;
					break;

				case AuthProvider.Github:
					signInResult = (await this.afa.auth.signInWithPopup(
						githubAuthProvider
					)) as UserCredential;
					break;

				case AuthProvider.PhoneNumber:
					// coming soon - see feature/sms branch
					break;

				default:
					throw new Error(
						`${
							AuthProvider[provider as any]
						} is not available as auth provider`
					);
			}
			await this.handleSuccess(signInResult);
		} catch (err) {
			this.handleError(err);
			console.error(err);
			// this._snackBar.open(err.message, 'OK', {duration: 5000});
			this.onErrorEmitter.next(err);
		} finally {
			this.isLoading = false;
		}
	}

	/**
	 * Sign up new users via email and password.
	 * After that the ngx-auth-firebaseui-user should verify and confirm an email sent via the firebase
	 *
	 * @param name - the name if the new ngx-auth-firebaseui-user
	 * @param credentials
	 * @returns
	 */
	public async signUp(name: string, credentials: ICredentials) {
		try {
			this.isLoading = true;
			const userCredential: UserCredential = await this.afa.auth.createUserWithEmailAndPassword(
				credentials.email,
				credentials.password
			);
			const user = userCredential.user;

			if (user) {
				if (this.config.enableFirestoreSync) {
					const providers: Partial<
						UserInfo
					>[] = (user.providerData.filter(data =>
						Boolean(data)
					) as UserInfo[]).map(data => {
						return {
							providerId: data.providerId
						};
					});

					await this._fireStoreService
						.getUserDocRefByUID(user.uid)
						.set({
							uid: user.uid,
							displayName: name,
							email: user.email,
							photoURL: user.photoURL,
							phoneNumber: user.phoneNumber,
							emailVerified: user.emailVerified,
							providers: providers
						} as AppUserInfo);

					await this.updateProfile(user, name, user.photoURL || '');
				}

				await user.sendEmailVerification();
				this.emailConfirmationSent = true;
				this.emailToConfirm = credentials.email;

				await this.handleSuccess(userCredential);
			} else {
				throw new Error('User was not created');
			}
		} catch (err) {
			this.handleError(err);
		} finally {
			this.isLoading = false;
		}
	}

	async signOut() {
		try {
			await this.afa.auth.signOut();
		} catch (err) {
			this.handleError(err);
			console.error(err);
			this.onErrorEmitter.next(err);
		}
	}

	/**
	 * Update the profile (name + photo url) of the authenticated ngx-auth-firebaseui-user in the
	 * firebase authentication feature (not in firestore)
	 *
	 * @param name - the new name of the authenticated ngx-auth-firebaseui-user
	 * @param photoURL - the new photo url of the authenticated ngx-auth-firebaseui-user
	 * @returns
	 */
	public async updateProfile(
		user: User,
		name: string,
		photoURL: string
	): Promise<any> {
		return await user.updateProfile({
			displayName: name,
			photoURL: photoURL
		});
	}

	public async deleteAccount(user: User): Promise<void> {
		return await user.delete();
	}

	public parseUserInfo(user: User): AppUserInfo {
		let providers: Partial<UserInfo>[] = [];
		if (user.providerData.length > 0) {
			providers = user.providerData.map(data => {
				return {
					providerId: data ? data.providerId : ''
				};
			});
		}
		return {
			uid: user.uid,
			displayName: user.displayName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
			providers: providers
		};
	}

	public getUserPhotoUrl(): string {
		const user: firebase.User | null = this.afa.auth.currentUser;

		if (!user) {
			return '';
		} else if (user.photoURL) {
			return user.photoURL;
		} else if (user.emailVerified) {
			return this.getPhotoPath(Accounts.CHECK);
		} else if (user.isAnonymous) {
			return this.getPhotoPath(Accounts.OFF);
		} else {
			return this.getPhotoPath(Accounts.NONE);
		}
	}

	public getPhotoPath(image: string) {
		return `assets/user/${image}.svg`;
	}

	async handleSuccess(userCredential: UserCredential) {
		const user = userCredential.user;
		if (user) {
			this.onSuccessEmitter.next(user);
			if (this.config.enableFirestoreSync) {
				try {
					await this._fireStoreService.updateUserData(
						this.parseUserInfo(user)
					);
				} catch (e) {
					console.error(
						`Error occurred while updating user data with firestore: ${e}`
					);
				}
			}
		}
	}

	handleError(error: any) {
		this.onErrorEmitter.next(error);
		if (this.config.toastMessageOnAuthError) {
			this._snackBar.open(
				this.messageOnAuthError
					? this.messageOnAuthError
					: error.message,
				'OK',
				{ duration: 5000 }
			);
		}
		console.error(error);
	}
}
