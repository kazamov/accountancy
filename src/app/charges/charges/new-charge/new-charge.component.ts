import { Component } from '@angular/core';
import { guid } from '@datorama/akita';
import { Subscription } from 'rxjs';

import { ICharge } from '../../state/charge.model';
import { ChargesService } from '../../state/charges.service';

@Component({
	selector: 'app-new-charge',
	templateUrl: './new-charge.component.html',
	styleUrls: ['./new-charge.component.css']
})
export class NewChargeComponent {
	isLoading$: Subscription | null = null;

	constructor(private chargesService: ChargesService) {}

	onCreateCharge(chargeData: ICharge) {
		const newCharge = {
			id: guid(),
			...chargeData
		};
		this.chargesService.addCharge(newCharge);
	}
}
