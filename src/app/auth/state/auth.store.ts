import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AppUserInfo } from '../interfaces/app-user-info.interface';

export interface AuthState {
	userData: AppUserInfo | null;
}

export function createInitialState(): AuthState {
	return {
		userData: null
	};
}

@Injectable()
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
	constructor() {
		super(createInitialState());
	}
}
