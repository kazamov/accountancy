import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/ngx-auth-firebaseui/auth.component';

const routes: Routes = [{ path: 'auth', component: AuthComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class Auth2RoutingModule {}
