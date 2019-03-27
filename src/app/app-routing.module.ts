import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth2/state/auth.guard';

const routes: Routes = [
	{
		path: 'charges',
		loadChildren: './charges/charges.module#ChargesModule',
		canLoad: [AuthGuard]
	},
	{
		path: 'categories',
		loadChildren: './categories/categories.module#CategoriesModule',
		canLoad: [AuthGuard]
	},
	{
		path: 'reports',
		loadChildren: './reports/reports.module#ReportsModule',
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
