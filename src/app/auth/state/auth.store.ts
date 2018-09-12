import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
	userId: string;
}

export function createInitialState(): AuthState {
	return {
		userId: ''
	};
}

@Injectable()
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
	constructor() {
		super(createInitialState());
	}
}
