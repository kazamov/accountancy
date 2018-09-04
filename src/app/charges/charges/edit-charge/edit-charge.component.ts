import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharge } from '../../state/charge.model';
import { ChargesService } from '../../state/charges.service';

@Component({
	selector: 'app-edit-charge',
	templateUrl: './edit-charge.component.html',
	styleUrls: ['./edit-charge.component.css']
})
export class EditChargeComponent {
	data: ICharge | null = null;

	constructor(
		activatedRoute: ActivatedRoute,
		private chargesService: ChargesService
	) {
		this.data = activatedRoute.snapshot.data['chargeData'];
	}

	onUpdateCharge(chargeData: ICharge) {
		const updatedCharge = {
			...this.data,
			...chargeData
		};
		this.chargesService.updateCharge(updatedCharge);
	}
}
