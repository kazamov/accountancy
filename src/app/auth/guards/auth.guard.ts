import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { of } from 'rxjs';
import { tap, take, catchError } from 'rxjs/operators';

import { AuthQuery } from '../state/auth.query';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
	constructor(private authQuery: AuthQuery, private router: Router) {}

	canLoad() {
		return this.isAuthenticated();
	}

	canActivate() {
		return this.isAuthenticated();
	}

	private isAuthenticated() {
		return this.authQuery.isAuthenticated$.pipe(
			take(1),
			tap(isAuthenticated => {
				if (!isAuthenticated) {
					this.router.navigate(['/auth']);
				}
			}),
			catchError(error => {
				console.log(error);
				return of(false);
			})
		);
	}
}
