import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportResolver } from './state/report.resolver';
import { ReportsSearchFormComponent } from './reports/reports-search-form/reports-search-form.component';
import { SummaryReportComponent } from './reports/summary-report/summary-report.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
	{
		path: '',
		component: ReportsComponent,
		children: [
			{ path: '', component: ReportsSearchFormComponent },
			{
				path: 'summary',
				component: SummaryReportComponent,
				resolve: [ReportResolver]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportsRoutingModule {}
