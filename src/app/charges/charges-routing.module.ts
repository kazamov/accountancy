import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargesComponent } from './charges/charges.component';
import { EditChargeComponent } from './charges/edit-charge/edit-charge.component';
import { NewChargeComponent } from './charges/new-charge/new-charge.component';
import { ChargeResolver } from './state/charge.resolver';
import { ChargesResolver } from './state/charges.resolver';
import { NewChargeResolver } from './state/new-charge.resolver';

const routes: Routes = [
	{
		path: '',
		component: ChargesComponent,
		resolve: {
			chargesData: ChargesResolver
		}
	},
	{
		path: 'charge',
		component: NewChargeComponent,
		resolve: {
			chargeData: NewChargeResolver
		}
	},
	{
		path: 'charge/:id',
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
