import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatFormFieldAppearance, MatSnackBar } from '@angular/material';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';

import { AuthProcessService } from '../../services/auth-process.service';
import {
	EMAIL_REGEX,
	PHONE_NUMBER_REGEX
} from '../ngx-auth-firebaseui/auth.component';
import { FirestoreSyncService } from '../../services/firestore-sync.service';
import { NgxAuthFirebaseUIConfigToken } from '../../auth-config.token';
import { NgxAuthFirebaseUIConfig } from '../../interfaces/config.interface';

@Component({
	selector: 'ngx-auth-firebaseui-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent {
	@Input()
	editMode = false;

	@Input()
	canLogout = true;

	@Input()
	canEditAccount = true;

	@Input()
	canDeleteAccount = true;

	@Input()
	appearance: MatFormFieldAppearance = 'standard';

	@Output()
	onSignOut: EventEmitter<void> = new EventEmitter();

	@Output()
	onAccountEdited: EventEmitter<void> = new EventEmitter();

	@Output()
	onAccountDeleted: EventEmitter<void> = new EventEmitter();

	updateFormGroup: FormGroup | null = null;
	updateNameFormControl: AbstractControl | null = null;
	updateEmailFormControl: AbstractControl | null = null;
	updatePhoneNumberFormControl: AbstractControl | null = null;
	updatePasswordFormControl: AbstractControl | null = null;

	constructor(
		@Inject(NgxAuthFirebaseUIConfigToken)
		public config: NgxAuthFirebaseUIConfig,
		public afa: AngularFireAuth,
		public authProcess: AuthProcessService,
		private _fireStoreService: FirestoreSyncService,
		private snackBar: MatSnackBar
	) {}

	protected initUpdateFormGroup() {
		const currentUser = this.afa.auth.currentUser;
		if (currentUser) {
			this.updateFormGroup = new FormGroup({
				name: this.updateNameFormControl = new FormControl(
					{ value: currentUser.displayName, disabled: true },
					[
						Validators.required,
						Validators.minLength(2),
						Validators.maxLength(25)
					]
				),

				email: this.updateEmailFormControl = new FormControl(
					{ value: currentUser.email, disabled: true },
					[Validators.required, Validators.pattern(EMAIL_REGEX)]
				),

				phoneNumber: this.updatePhoneNumberFormControl = new FormControl(
					'',
					[Validators.pattern(PHONE_NUMBER_REGEX)]
				)
			});

			this.updateFormGroup.enable();
		}
	}

	changeEditMode() {
		this.editMode = !this.editMode;

		this.editMode ? this.initUpdateFormGroup() : this.reset();
	}

	reset() {
		if (this.updateFormGroup) {
			this.updateFormGroup.reset();
			this.updateFormGroup.disable();
			this.updateFormGroup = null;
		}
	}

	// todo: 31.3.18
	async save() {
		if (this.updateFormGroup && this.updateFormGroup.dirty) {
			const user = this.afa.auth.currentUser;
			// ngx-auth-firebaseui-user.updateProfile()
			// ngx-auth-firebaseui-user.updateEmail()
			// console.log('form = ', this.updateFormGroup);

			const snackBarMsg: string[] = [];

			try {
				if (user) {
					if (
						this.updateNameFormControl &&
						this.updateNameFormControl.dirty
					) {
						await user.updateProfile({
							displayName: this.updateNameFormControl.value,
							photoURL: null
						});
						snackBarMsg.push(
							`your name has been update to ${user.displayName}`
						);
					}

					if (
						this.updateEmailFormControl &&
						this.updateEmailFormControl.dirty
					) {
						await user.updateEmail(
							this.updateEmailFormControl.value
						);
						snackBarMsg.push(
							`your email has been update to ${user.email}`
						);
					}

					if (
						this.updatePhoneNumberFormControl &&
						this.updatePhoneNumberFormControl.dirty
					) {
						await user.updatePhoneNumber(
							this.updatePhoneNumberFormControl.value
						);
						console.log(
							'phone number = ',
							this.updatePhoneNumberFormControl.value
						);
						snackBarMsg.push(
							`your phone number has been update to ${
								user.phoneNumber
							}`
						);
					}

					if (this.config.enableFirestoreSync) {
						await this._fireStoreService.updateUserData(
							this.authProcess.parseUserInfo(user)
						);
					}
				}
			} catch (error) {
				error.message
					? this.snackBar.open(error.message, 'Ok')
					: this.snackBar.open(error, 'Ok');
				console.error(error);
				console.error(error.code);
				console.error(error.message);
			}

			if (snackBarMsg.length > 0) {
				this.snackBar.open(snackBarMsg.join('\\n'), 'Ok');
			}
			// this.updateFormGroup.reset();
		}

		this.editMode = false;
	}

	async signOut() {
		try {
			await this.afa.auth.signOut();
			// Sign-out successful.
			this.onSignOut.emit();
		} catch (e) {
			// An error happened.
			console.error('An error happened while signing out!', e);
		}
	}

	/**
	 * Delete the account of the current firebase ngx-auth-firebaseui-user
	 *
	 * On Success, emit the <onAccountDeleted> event and toast a msg!#
	 * Otherwise, log the and toast and error msg!
	 *
	 */
	async deleteAccount() {
		try {
			const user = this.afa.auth.currentUser;

			if (user) {
				await this.authProcess.deleteAccount(user);
				if (this.config.enableFirestoreSync) {
					await this._fireStoreService.deleteUserData(user.uid);
				}
			}

			this.onAccountDeleted.emit();
			this.editMode = false;
			this.snackBar.open(
				'Your account has been successfully deleted!',
				'OK',
				{
					duration: 5000
				}
			);
		} catch (error) {
			console.log(
				"Error while delete ngx-auth-firebaseui-user's account",
				error
			);
			this.snackBar.open(
				'Error occurred while deleting your account!',
				'OK',
				{
					duration: 5000
				}
			);
		}
	}
}
