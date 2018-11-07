import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { groupBy, aggregateSum } from './report-helpers';
import { ICharge } from './interfaces/charge.interface';
import { IReport } from './interfaces/report.interface';

admin.initializeApp();
const db = admin.firestore();

export const onUserCreate = functions
	.region('europe-west1')
	.auth.user()
	.onCreate(async (user, context) => {
		console.log(user.toJSON());
		console.log(context);

		try {
			const userDocRef = db.collection('users').doc(user.uid);
			await userDocRef.set({
				email: user.email
			});

			['Продукты', 'Проезд', 'Здоровье', 'Коммунальные услуги'].forEach(
				async categoryName => {
					const categoryDoc = await userDocRef
						.collection('categories')
						.add({
							id: '',
							name: categoryName
						});
					await categoryDoc.update({ id: categoryDoc.id });
				}
			);
		} catch (error) {
			console.log(error);
		}
	});

export const onCreateChargesReport = functions
	.region('europe-west1')
	.https.onCall(
		async (data: { startDate?: number; endDate?: number }, context) => {
			console.log(data);
			console.log(context);

			if (!context.auth) {
				throw new functions.https.HttpsError(
					'failed-precondition',
					'The function must be called while authenticated.'
				);
			}

			try {
				const userDocRef = db.collection('users').doc(context.auth.uid);
				let chargesQuery = userDocRef
					.collection('charges')
					.orderBy('date');

				if (data.startDate) {
					chargesQuery = chargesQuery.where(
						'date',
						'>=',
						new Date(data.startDate)
					);
				}
				if (data.endDate) {
					chargesQuery = chargesQuery.where(
						'date',
						'<=',
						new Date(data.endDate)
					);
				}

				const charges: ICharge[] = [];
				const chargesQuerySnapshot = await chargesQuery.get();
				chargesQuerySnapshot.forEach(chargeDocSnapshot => {
					charges.push(chargeDocSnapshot.data() as ICharge);
				});

				const groupedData = groupBy(charges, 'category');

				const groupsIterator = groupedData.entries();

				const report: IReport = {
					groups: [],
					total: 0
				};
				for (const [groupId, chargesData] of groupsIterator) {
					report.groups.push({
						groupId,
						total: aggregateSum(chargesData, charge => charge.price)
					});
				}
				report.total = aggregateSum(
					report.groups,
					group => group.total
				);

				return report;
			} catch (error) {
				console.log(error);
				throw new functions.https.HttpsError(
					'unknown',
					'Unknown error'
				);
			}
		}
	);
