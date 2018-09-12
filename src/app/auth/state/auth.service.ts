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
			this.router.navigate([
				`/${isAuthenticated ? 'charges' : 'signin'}`
			]);
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
			await this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
				email,
				password
			);
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
