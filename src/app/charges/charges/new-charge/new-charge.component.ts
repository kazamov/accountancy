import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICharge } from 'data';

import { ChargesService } from '../../state/charges.service';

@Component({
	selector: 'app-new-charge',
	templateUrl: './new-charge.component.html',
	styleUrls: ['./new-charge.component.scss']
})
export class NewChargeComponent {
	isLoading$: Subscription | null = null;

	constructor(private chargesService: ChargesService) {}

	onCreateCharge(chargeData: Partial<ICharge>) {
		this.chargesService.addCharge(chargeData);
	}
}
