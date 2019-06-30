import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
	{
		path: 'charges',
		loadChildren: () =>
			import('./charges/charges.module').then(m => m.ChargesModule),
		canLoad: [AuthGuard]
	},
	{
		path: 'categories',
		loadChildren: () =>
			import('./categories/categories.module').then(
				m => m.CategoriesModule
			),
		canLoad: [AuthGuard]
	},
	{
		path: 'reports',
		loadChildren: () =>
			import('./reports/reports.module').then(m => m.ReportsModule),
		canLoad: [AuthGuard]
	},
	{ path: '', redirectTo: 'charges', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
