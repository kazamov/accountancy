import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChargesComponent } from './charges/charges.component';
import { NewChargeComponent } from './new-charge/new-charge.component';
import { ChargesService } from './charges.service';
import { MaterialModule } from '../material.module';
import { ChargesRoutingModule } from './charges-routing.module';
import { ChargeFormComponent } from './charge-form/charge-form.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		ChargesRoutingModule,
		ReactiveFormsModule
	],
	declarations: [ChargesComponent, NewChargeComponent, ChargeFormComponent],
	providers: [ChargesService]
})
export class ChargesModule {}
