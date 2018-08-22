import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesComponent } from './charges/charges.component';
import { NewChargeComponent } from './new-charge/new-charge.component';
import { ChargesService } from './charges.service';
import { MaterialModule } from '../material.module';

@NgModule({
	imports: [CommonModule, MaterialModule],
	declarations: [ChargesComponent, NewChargeComponent],
	providers: [ChargesService]
})
export class ChargesModule {}
