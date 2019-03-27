import { UserInfo } from 'firebase';

export interface AppUserInfo {
	uid: string;
	displayName: string | null;
	email: string | null;
	phoneNumber: string | null;
	photoURL: string | null;
	providers: Partial<UserInfo>[];
	emailVerified: boolean;
}
