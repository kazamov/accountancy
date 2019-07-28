import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UserInfo } from 'firebase';

import { AuthQuery } from '../../state/auth.query';
import { AppUserInfo } from '../../interfaces/app-user-info.interface';
import {
	AuthProvider,
	AuthProcessService
} from '../../services/auth-process.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
	user$: Observable<AppUserInfo>;

	authProvider = AuthProvider;
	connectedProviders = [];

	constructor(
		private authQuery: AuthQuery,
		public authProcess: AuthProcessService,
		_iconRegistry: MatIconRegistry,
		_sanitizer: DomSanitizer
	) {
		this.user$ = this.authQuery.select(
			state => state.userData as AppUserInfo
		);

		_iconRegistry
			.addSvgIcon(
				'google-colored',
				_sanitizer.bypassSecurityTrustResourceUrl('/assets/google.svg')
			)
			.addSvgIcon(
				'facebook',
				_sanitizer.bypassSecurityTrustResourceUrl(
					'/assets/mdi/facebook.svg'
				)
			);
	}

	facebookLinked(providers: Partial<UserInfo>[]) {
		return providers.some(
			provider => provider.providerId === 'facebook.com'
		);
	}

	googleLinked(providers: Partial<UserInfo>[]) {
		return providers.some(provider => provider.providerId === 'google.com');
	}
}
