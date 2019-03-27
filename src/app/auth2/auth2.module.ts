import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/ngx-auth-firebaseui/auth.component';
import { AuthProvidersComponent } from './components/providers/auth.providers.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import {
	defaultAuthFirebaseUIConfig,
	NgxAuthFirebaseUIConfig
} from './interfaces/config.interface';
import { FirestoreSyncService } from './services/firestore-sync.service';
import { AuthProcessService } from './services/auth-process.service';
import { FirebaseAppConfig, FirebaseOptionsToken } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatDialogModule,
	MatDividerModule,
	MatIconModule,
	MatInputModule,
	MatSnackBarModule,
	MatTabsModule,
	MatTooltipModule,
	MatProgressSpinnerModule,
	MatProgressBarModule,
	MatCheckboxModule,
	MatMenuModule
} from '@angular/material';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { RouterModule } from '@angular/router';

import { LegalityDialogComponent } from './components/legality-dialog/legality-dialog.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { NgxAuthFirebaseuiAvatarComponent } from './components/ngx-auth-firebaseui-avatar/ngx-auth-firebaseui-avatar.component';
import { Auth2RoutingModule } from './auth2-routing.module';
import { NgxAuthFirebaseUIConfigToken } from './auth-config.token';

@NgModule({
	imports: [
		CommonModule,
		// HTTP
		RouterModule,
		HttpClientModule,
		// FLEX_LAYOUT
		FlexLayoutModule,
		// FORMS
		FormsModule,
		ReactiveFormsModule,
		// MATERIAL2
		MatTabsModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSnackBarModule,
		MatDividerModule,
		MatChipsModule,
		MatTooltipModule,
		MatDialogModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatDialogModule,
		MatMenuModule,
		// ANGULAR MATERIAL EXTENSIONS
		MatPasswordStrengthModule,
		// ANGULARFIRE2
		AngularFireAuthModule,
		AngularFirestoreModule,
		// ROUTING
		Auth2RoutingModule
	],
	exports: [
		AuthComponent,
		NgxAuthFirebaseuiAvatarComponent,
		AuthProvidersComponent,
		EmailConfirmationComponent,
		// LoggedInGuard,
		AngularFireAuthModule,
		AngularFirestoreModule
	],
	declarations: [
		AuthComponent,
		NgxAuthFirebaseuiAvatarComponent,
		AuthProvidersComponent,
		EmailConfirmationComponent,
		LegalityDialogComponent
	],
	entryComponents: [LegalityDialogComponent]
})
export class NgxAuthFirebaseUIModule {
	static forRoot(
		configFactory: FirebaseAppConfig,
		config: NgxAuthFirebaseUIConfig = defaultAuthFirebaseUIConfig
	): ModuleWithProviders {
		return {
			ngModule: NgxAuthFirebaseUIModule,
			providers: [
				{
					provide: FirebaseOptionsToken,
					useValue: configFactory
				},
				{
					provide: NgxAuthFirebaseUIConfigToken,
					useValue: config
				},
				AuthProcessService,
				FirestoreSyncService,
				LoggedInGuard
			]
		};
	}

	constructor(
		@Inject(NgxAuthFirebaseUIConfigToken)
		public config: NgxAuthFirebaseUIConfig
	) {
		this.config = Object.assign(defaultAuthFirebaseUIConfig, this.config);
	}
}
