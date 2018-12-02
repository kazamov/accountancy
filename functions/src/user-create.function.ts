import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export async function onUserCreateFunction(
	user: admin.auth.UserRecord,
	context: functions.EventContext,
	db: FirebaseFirestore.Firestore
) {
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
}
