import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharge } from 'data';
import { ChargesService } from '../../state/charges.service';

@Component({
	selector: 'app-edit-charge',
	templateUrl: './edit-charge.component.html',
	styleUrls: ['./edit-charge.component.scss']
})
export class EditChargeComponent {
	data: ICharge;

	constructor(
		activatedRoute: ActivatedRoute,
		private chargesService: ChargesService
	) {
		this.data = activatedRoute.snapshot.data['chargeData'];
	}

	onUpdateCharge(chargeData: Partial<ICharge>) {
		this.chargesService.updateCharge(this.data.id, chargeData);
	}
}
