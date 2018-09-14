import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { LoginGuard } from './state/login.guard';

const routes: Routes = [
	{ path: 'signin', component: SigninComponent, canActivate: [LoginGuard] },
	{ path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
	{
		path: 'reset-password',
		component: PasswordResetComponent,
		canActivate: [LoginGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
