import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
	isAuthenticated: boolean;
}

export function createInitialState(): AuthState {
	return {
		isAuthenticated: false
	};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
	constructor() {
		super(createInitialState());
	}
}
