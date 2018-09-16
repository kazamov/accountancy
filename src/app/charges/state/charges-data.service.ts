import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';

import { ICharge, IChargeData } from './charge.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { BackendCollections } from '../../shared/backend-collections.enum';

@Injectable()
export class ChargesDataService {
	constructor(private db: AngularFirestore, private authQuery: AuthQuery) {}

	getCharges() {
		const userId = this.authQuery.getSnapshot().userId;

		return this.db
			.collection<ICharge>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CHARGES
				}`,
				collectionRef => collectionRef.orderBy('date', 'desc')
			)
			.valueChanges()
			.pipe(
				map(chargesData =>
					chargesData.map(charge => {
						return {
							...charge,
							date: (charge.date as any).toDate()
						};
					})
				),
				take(1)
			);
	}

	getCharge(id: ID) {
		const userId = this.authQuery.getSnapshot().userId;
		const chargeDocRef = this.db
			.collection<ICharge>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CHARGES
				}`
			)
			.doc<ICharge>(id as string);

		return chargeDocRef.valueChanges().pipe(
			map(chargeData => {
				if (chargeData) {
					return {
						...chargeData,
						date: (chargeData.date as any).toDate()
					};
				}
				return chargeData;
			}),
			take(1)
		);
	}

	deleteCharge(id: ID) {
		const userId = this.authQuery.getSnapshot().userId;

		const chargeDoc = this.db
			.collection<ICharge>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CHARGES
				}`
			)
			.doc<ICharge>(id as string);

		return chargeDoc.delete();
	}

	addCharge(chargeData: IChargeData) {
		const userId = this.authQuery.getSnapshot().userId;
		const newChargeId = this.db.createId();

		const newChargeDoc = this.db
			.collection<ICharge>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CHARGES
				}`
			)
			.doc<ICharge>(newChargeId);

		return newChargeDoc
			.set({
				id: newChargeId,
				...chargeData
			})
			.then(() => {
				return newChargeId as ID;
			});
	}

	updateCharge(id: ID, chargeData: IChargeData) {
		const userId = this.authQuery.getSnapshot().userId;

		const chargeDoc = this.db
			.collection<ICharge>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CHARGES
				}`
			)
			.doc<ICharge>(id as string);

		return chargeDoc.update({
			...chargeData
		});
	}
}
