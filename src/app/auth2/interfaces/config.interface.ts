export interface NgxAuthFirebaseUIConfig {
	authGuardFallbackURL?: string;
	enableFirestoreSync?: boolean;
	toastMessageOnAuthSuccess?: boolean;
	toastMessageOnAuthError?: boolean;
}

export const defaultAuthFirebaseUIConfig: NgxAuthFirebaseUIConfig = {
	authGuardFallbackURL: '/',
	enableFirestoreSync: true,
	toastMessageOnAuthSuccess: true,
	toastMessageOnAuthError: true
};
