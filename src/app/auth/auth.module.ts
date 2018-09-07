import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
	imports: [
		SharedModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		FlexLayoutModule
	],
	declarations: [SignupComponent, SigninComponent, PasswordResetComponent]
})
export class AuthModule {}
