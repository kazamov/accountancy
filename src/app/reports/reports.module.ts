import { NgModule } from '@angular/core';
import {
	AngularFireFunctionsModule,
	AngularFireFunctions
} from '@angular/fire/functions';

import { ReportsComponent } from './reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [SharedModule, ReportsRoutingModule, AngularFireFunctionsModule],
	declarations: [ReportsComponent],
	providers: [AngularFireFunctions]
})
export class ReportsModule {}
