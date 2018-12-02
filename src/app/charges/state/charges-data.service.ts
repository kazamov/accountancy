import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { ICharge } from 'data';

import { IChargeData } from './charge.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { BackendCollections } from '../../shared/backend-collections.enum';

@Injectable()
export class ChargesDataService {
	constructor(private db: AngularFirestore, private authQuery: AuthQuery) {}

	getCharges(pageSize: number, lastItem: ICharge | null) {
		const userId = this.authQuery.getSnapshot().userId;

		return this.db
			.collection<ICharge>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CHARGES
				}`,
				collectionRef => {
					let query = collectionRef
						.orderBy('date', 'desc')
						.orderBy('id');

					if (lastItem) {
						query = query.startAfter(lastItem.date, lastItem.id);
					}

					if (typeof pageSize === 'number') {
						query = query.limit(pageSize);
					}

					return query;
				}
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

	getCharge(id: string) {
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

	deleteCharge(id: string) {
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
				return newChargeId;
			});
	}

	updateCharge(id: string, chargeData: IChargeData) {
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
