import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargesComponent } from './charges/charges.component';
import { NewChargeComponent } from './new-charge/new-charge.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChargesComponent, NewChargeComponent]
})
export class ChargesModule { }
