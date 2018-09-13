import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
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
