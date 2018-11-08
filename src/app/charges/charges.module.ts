import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '../shared/shared.module';
import { ChargesComponent } from './charges/charges.component';
import { ChargesRoutingModule } from './charges-routing.module';
import { EditChargeComponent } from './charges/edit-charge/edit-charge.component';
import { NewChargeComponent } from './charges/new-charge/new-charge.component';
import { ChargeFormComponent } from './charges/charge-form/charge-form.component';
import { ChargeCardComponent } from './charges/charge-card/charge-card.component';
import { ChargesService } from './state/charges.service';
import { ChargesDataService } from './state/charges-data.service';
import { ChargesQuery } from './state/charges.query';
import { ChargesStore } from './state/charges.store';
import { ChargeResolver } from './state/charge.resolver';
import { ChargesResolver } from './state/charges.resolver';
import { NewChargeResolver } from './state/new-charge.resolver';

@NgModule({
	imports: [SharedModule, ChargesRoutingModule, ScrollingModule],
	declarations: [
		ChargesComponent,
		NewChargeComponent,
		ChargeFormComponent,
		EditChargeComponent,
		ChargeCardComponent
	],
	providers: [
		ChargesService,
		ChargesDataService,
		ChargesQuery,
		ChargesStore,
		ChargeResolver,
		ChargesResolver,
		NewChargeResolver
	]
})
export class ChargesModule {}
