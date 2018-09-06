// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebaseConfig: {
		apiKey: 'AIzaSyCWFI0_Kzu6H2pshZlVUJi0c1TwOegMNUk',
		authDomain: 'home-accountancy.firebaseapp.com',
		databaseURL: 'https://home-accountancy.firebaseio.com',
		projectId: 'home-accountancy',
		storageBucket: 'home-accountancy.appspot.com',
		messagingSenderId: '736619925670'
	}
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
