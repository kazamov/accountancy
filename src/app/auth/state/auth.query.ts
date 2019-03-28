import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { filter, take, switchMap, map } from 'rxjs/operators';

import { AuthStore, AuthState } from './auth.store';

@Injectable()
export class AuthQuery extends Query<AuthState> {
	readonly isAuthenticated$: Observable<boolean>;

	constructor(protected store: AuthStore) {
		super(store);

		this.isAuthenticated$ = this.selectLoading().pipe(
			filter(isLoading => !isLoading),
			take(1),
			switchMap(() => this.select(state => state.userData)),
			map(userData => Boolean(userData))
		);
	}
}
