import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AuthStore } from './auth.store';
import { AuthQuery } from './auth.query';

@Injectable()
export class AuthService {
	constructor(
		private afAuth: AngularFireAuth,
		private authStore: AuthStore,
		private authQuery: AuthQuery,
		private router: Router
	) {
		this.authStore.setLoading(true);
		this.afAuth.authState.subscribe(user => {
			this.authStore.update({
				userId: user ? user.uid : ''
			});
			this.authStore.setLoading(false);
		});

		this.authQuery.isAuthenticated$.subscribe(isAuthenticated => {
			if (isAuthenticated) {
				if (this.router.url.search(/signin|signup/i) !== -1) {
					this.router.navigate(['/charges']);
				}
			} else {
				if (this.router.url.search(/signin|signup/i) === -1) {
					this.router.navigate(['/signin']);
				}
			}
		});
	}

	async signUp(username: string, email: string, password: string) {
		console.log(username);
		try {
			await this.afAuth.auth.createUserWithEmailAndPassword(
				email,
				password
			);
		} catch (error) {
			console.log(error);
		}
	}

	async signIn(email: string, password: string) {
		try {
			await this.afAuth.auth.signInWithEmailAndPassword(email, password);
		} catch (error) {
			console.log(error);
		}
	}

	async signOut() {
		try {
			await this.afAuth.auth.signOut();
		} catch {}
	}
}
