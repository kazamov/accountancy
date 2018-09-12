import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreDocument
} from '@angular/fire/firestore';
import { UserInfo } from 'firebase';

export const collections = {
	users: 'users'
};

@Injectable()
export class UserService {
	constructor(private afStore: AngularFirestore) {}

	getUserDocRefByUID(uid: string): AngularFirestoreDocument<UserInfo> {
		return this.afStore.doc(`${collections.users}/${uid}`);
	}

	createUser(username: string, userData: UserInfo) {
		const newUserDoc = this.afStore.doc<UserInfo>(
			`${collections.users}/${userData.uid}`
		);

		return newUserDoc.set({
			uid: userData.uid,
			displayName: username,
			email: userData.email,
			photoURL: userData.photoURL,
			phoneNumber: null,
			providerId: userData.providerId
		});
	}
}
