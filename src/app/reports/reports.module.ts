import { NgModule } from '@angular/core';
import {
	AngularFireFunctionsModule,
	AngularFireFunctions
} from '@angular/fire/functions';

import { ReportsComponent } from './reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReportsSearchFormComponent } from './reports/reports-search-form/reports-search-form.component';
import { ReportQuery } from './state/report.query';
import { ReportStore } from './state/report.store';
import { ReportService } from './state/report.service';
import { SummaryReportComponent } from './reports/summary-report/summary-report.component';
import { ReportResolver } from './state/report.resolver';

@NgModule({
	imports: [SharedModule, ReportsRoutingModule, AngularFireFunctionsModule],
	declarations: [
		ReportsComponent,
		ReportsSearchFormComponent,
		SummaryReportComponent
	],
	providers: [
		AngularFireFunctions,
		ReportQuery,
		ReportStore,
		ReportService,
		ReportResolver
	]
})
export class ReportsModule {}
