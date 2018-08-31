import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargesComponent } from './charges/charges.component';
import { EditChargeComponent } from './charges/edit-charge/edit-charge.component';
import { NewChargeComponent } from './charges/new-charge/new-charge.component';
import { ChargeResolver } from './state/charge.resolver';
import { ChargesResolver } from './state/charges.resolver';

const routes: Routes = [
	{
		path: 'charges',
		component: ChargesComponent,
		resolve: {
			chargesData: ChargesResolver
		}
	},
	{ path: 'charges/charge', component: NewChargeComponent },
	{
		path: 'charges/charge/:id',
		component: EditChargeComponent,
		resolve: {
			chargeData: ChargeResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChargesRoutingModule {}
