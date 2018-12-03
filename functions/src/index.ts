import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ISearchCriteria } from 'data';

import { onUserCreateFunction } from './user-create.function';
import { onCreateChargesFunction } from './create-charges.function';

admin.initializeApp();
const db = admin.firestore();

export const onUserCreate = functions
	.region('europe-west1')
	.auth.user()
	.onCreate(async (user, context) => {
		onUserCreateFunction(user, context, db);
	});

export const onCreateChargesReport = functions
	.region('europe-west1')
	.https.onCall(async (data: ISearchCriteria, context) => {
		onCreateChargesFunction(data, context, db);
	});
