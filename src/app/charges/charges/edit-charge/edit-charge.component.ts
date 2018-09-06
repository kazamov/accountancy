import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharge, IChargeData } from '../../state/charge.model';
import { ChargesService } from '../../state/charges.service';

@Component({
	selector: 'app-edit-charge',
	templateUrl: './edit-charge.component.html',
	styleUrls: ['./edit-charge.component.css']
})
export class EditChargeComponent {
	data: ICharge;

	constructor(
		activatedRoute: ActivatedRoute,
		private chargesService: ChargesService
	) {
		this.data = activatedRoute.snapshot.data['chargeData'];
	}

	onUpdateCharge(chargeData: IChargeData) {
		this.chargesService.updateCharge(this.data.id, chargeData);
	}
}
