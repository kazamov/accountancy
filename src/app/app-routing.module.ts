import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargesComponent } from './charges/charges/charges.component';
import { ReportsComponent } from './reports/reports/reports.component';

const routes: Routes = [
	{ path: 'charges', component: ChargesComponent },
	{ path: 'reports', component: ReportsComponent },
	{ path: '', redirectTo: 'charges', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
