import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { IChargeData } from '../../state/charge.model';
import { ChargesService } from '../../state/charges.service';

@Component({
	selector: 'app-new-charge',
	templateUrl: './new-charge.component.html',
	styleUrls: ['./new-charge.component.css']
})
export class NewChargeComponent {
	isLoading$: Subscription | null = null;

	constructor(private chargesService: ChargesService) {}

	onCreateCharge(chargeData: IChargeData) {
		this.chargesService.addCharge(chargeData);
	}
}
