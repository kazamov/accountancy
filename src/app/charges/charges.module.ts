import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChargesComponent } from './charges/charges.component';
import { ChargesService } from './charges.service';
import { MaterialModule } from '../material.module';
import { ChargesRoutingModule } from './charges-routing.module';
import { EditChargeComponent } from './charges/edit-charge/edit-charge.component';
import { NewChargeComponent } from './charges/new-charge/new-charge.component';
import { ChargeFormComponent } from './charges/charge-form/charge-form.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		ChargesRoutingModule,
		ReactiveFormsModule
	],
	declarations: [
		ChargesComponent,
		NewChargeComponent,
		ChargeFormComponent,
		EditChargeComponent
	],
	providers: [ChargesService]
})
export class ChargesModule { }
