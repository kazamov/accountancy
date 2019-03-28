import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take, tap, map } from 'rxjs/operators';

import { AuthQuery } from '../state/auth.query';

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private authQuery: AuthQuery, private router: Router) {}

	canActivate() {
		return this.authQuery.isAuthenticated$.pipe(
			take(1),
			map(isAuthenticated => !isAuthenticated),
			tap(isNotAuthenticated => {
				if (!isNotAuthenticated) {
					this.router.navigate(['/charges']);
				}
			})
		);
	}
}
