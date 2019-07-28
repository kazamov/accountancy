import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import {
	AuthProcessService,
	AuthProvider
} from '../../services/auth-process.service';

@Component({
	selector: 'app-auth-firebaseui-providers',
	templateUrl: 'auth.providers.component.html',
	styleUrls: ['auth.providers.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthProvidersComponent {
	authProvider = AuthProvider;

	constructor(
		public authProcess: AuthProcessService,
		_iconRegistry: MatIconRegistry,
		_sanitizer: DomSanitizer
	) {
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
}
