import { NgModule } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { AuthComponent } from './components/auth-firebaseui/auth.component';
import { AuthProvidersComponent } from './components/providers/auth.providers.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { FirestoreSyncService } from './services/firestore-sync.service';
import { AuthProcessService } from './services/auth-process.service';

import { AuthFirebaseuiAvatarComponent } from './components/auth-firebaseui-avatar/auth-firebaseui-avatar.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		// FLEX_LAYOUT
		FlexLayoutModule,
		// ANGULAR MATERIAL EXTENSIONS
		MatPasswordStrengthModule,
		// ANGULARFIRE2
		AngularFireAuthModule,
		// ROUTING
		AuthRoutingModule
	],
	declarations: [
		AuthComponent,
		AuthFirebaseuiAvatarComponent,
		AuthProvidersComponent,
		EmailConfirmationComponent
	],
	providers: [AuthProcessService, FirestoreSyncService, AngularFireAuth]
})
export class AuthModule {}
