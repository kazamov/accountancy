import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(
	async (request, response) => {
		console.log(request);
		response.send('Hello from Firebase!');
	}
);
