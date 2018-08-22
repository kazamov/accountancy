import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
	imports: [CommonModule, ReportsRoutingModule],
	declarations: [ReportsComponent]
})
export class ReportsModule {}
