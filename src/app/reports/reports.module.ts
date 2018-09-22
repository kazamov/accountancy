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

@NgModule({
	imports: [SharedModule, ReportsRoutingModule, AngularFireFunctionsModule],
	declarations: [ReportsComponent, ReportsSearchFormComponent],
	providers: [AngularFireFunctions, ReportQuery, ReportStore, ReportService]
})
export class ReportsModule {}
