import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: 'charges', loadChildren: './charges/charges.module#ChargesModule' },
	{
		path: 'categories',
		loadChildren: './categories/categories.module#CategoriesModule'
	},
	{ path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
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
