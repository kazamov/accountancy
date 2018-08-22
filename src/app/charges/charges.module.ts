import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesComponent } from './charges/charges.component';
import { NewChargeComponent } from './new-charge/new-charge.component';
import { ChargesService } from './charges.service';
import { MaterialModule } from '../material.module';
import { ChargesRoutingModule } from './charges-routing.module';

@NgModule({
	imports: [CommonModule, MaterialModule, ChargesRoutingModule],
	declarations: [ChargesComponent, NewChargeComponent],
	providers: [ChargesService]
})
export class ChargesModule {}
