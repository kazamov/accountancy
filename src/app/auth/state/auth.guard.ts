import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { AuthQuery } from './auth.query';
import { tap, take } from 'rxjs/operators';

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
			})
		);
	}
}
