import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargesComponent } from './charges/charges.component';
import { NewChargeComponent } from './new-charge/new-charge.component';

const routes: Routes = [
	{ path: 'charges', component: ChargesComponent },
	{ path: 'charges/charge', component: NewChargeComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChargesRoutingModule {}
