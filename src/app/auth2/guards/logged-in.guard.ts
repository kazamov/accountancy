import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NgxAuthFirebaseUIConfigToken } from '../auth-config.token';
import { AuthProcessService } from '../services/auth-process.service';
import { NgxAuthFirebaseUIConfig } from '../interfaces/config.interface';

@Injectable({
	providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
	constructor(
		@Inject(NgxAuthFirebaseUIConfigToken)
		private config: NgxAuthFirebaseUIConfig,
		private router: Router,
		private auth: AuthProcessService
	) {}

	canActivate(): Observable<boolean> {
		return this.auth.afa.user.pipe(
			map(res => {
				if (res) {
					return true;
				}
				this.router.navigate([`/${this.config.authGuardFallbackURL}`]);
				return false;
			})
		);
	}
}
