import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import {
	AuthProcessService,
	AuthProvider
} from '../../services/auth-process.service';

export enum Layout {
	ROW = 'row',
	COLUMN = 'column'
}

@Component({
	selector: 'app-auth-firebaseui-providers',
	templateUrl: 'auth.providers.component.html',
	styleUrls: ['auth.providers.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthProvidersComponent {
	@Input()
	layout: string = Layout.ROW;

	@Input()
	providers: string[] = [AuthProvider.Google, AuthProvider.Facebook]; //  google, facebook, twitter, github

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
