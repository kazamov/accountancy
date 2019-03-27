import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument
} from '@angular/fire/firestore';
import { QueryFn } from '@angular/fire/firestore/interfaces';
import { AppUserInfo } from '../interfaces/app-user-info.interface';

export const collections = {
	users: 'users'
};

@Injectable()
export class FirestoreSyncService {
	constructor(public afs: AngularFirestore) {}

	public getUserDocRefByUID(
		uid: string
	): AngularFirestoreDocument<AppUserInfo> {
		return this.afs.doc(`${collections.users}/${uid}`);
	}

	public getUsersCollectionRef(
		queryFn?: QueryFn
	): AngularFirestoreCollection<AppUserInfo> {
		return this.afs.collection(`${collections.users}/`, queryFn);
	}

	public deleteUserData(uid: string): Promise<any> {
		const userRef: AngularFirestoreDocument<
			AppUserInfo
		> = this.getUserDocRefByUID(uid);
		return userRef.delete();
	}

	public updateUserData(user: AppUserInfo): Promise<any> {
		// Sets user$ data to firestore on login
		const userRef: AngularFirestoreDocument<
			AppUserInfo
		> = this.getUserDocRefByUID(user.uid);
		const data: AppUserInfo = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			phoneNumber: user.phoneNumber,
			emailVerified: user.emailVerified,
			providers: user.providers
		};
		return userRef.set(data, { merge: true });
	}
}
