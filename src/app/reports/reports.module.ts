import { NgModule } from '@angular/core';

import { ReportsComponent } from './reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [SharedModule, ReportsRoutingModule],
	declarations: [ReportsComponent]
})
export class ReportsModule {}
