import * as functions from 'firebase-functions';
import { ICharge, IReport, ISearchCriteria } from 'data';
import { groupBy, aggregateSum } from './report-helpers';

export async function onCreateChargesFunction(
	data: ISearchCriteria,
	context: functions.https.CallableContext,
	db: FirebaseFirestore.Firestore
) {
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
		let chargesQuery = userDocRef.collection('charges').orderBy('date');

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
		report.total = aggregateSum(report.groups, group => group.total);

		return report;
	} catch (error) {
		console.log(error);
		throw new functions.https.HttpsError('unknown', 'Unknown error');
	}
}
