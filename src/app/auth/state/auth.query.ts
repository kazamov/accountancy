import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { AuthStore, AuthState } from './auth.store';
import { Observable } from 'rxjs';
import { filter, take, switchMap, map } from 'rxjs/operators';

@Injectable()
export class AuthQuery extends Query<AuthState> {
	readonly isAuthenticated$: Observable<boolean>;

	constructor(protected store: AuthStore) {
		super(store);

		this.isAuthenticated$ = this.selectLoading().pipe(
			filter(isLoading => !isLoading),
			take(1),
			switchMap(() => this.select(state => state.userId)),
			map(userId => Boolean(userId))
		);
	}
}
