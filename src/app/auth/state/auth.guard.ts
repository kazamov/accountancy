import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, take, catchError } from 'rxjs/operators';

import { AuthQuery } from './auth.query';

@Injectable()
export class AuthGuard implements CanLoad {
	constructor(private authQuery: AuthQuery, private router: Router) {}

	canLoad() {
		return this.authQuery.isAuthenticated$.pipe(
			take(1),
			tap(isAuthenticated => {
				if (!isAuthenticated) {
					this.router.navigate(['/signin']);
				}
			}),
			catchError(error => {
				console.log(error);
				return of(false);
			})
		);
	}
}
