import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharge } from '../../state/charge.model';

@Component({
	selector: 'app-edit-charge',
	templateUrl: './edit-charge.component.html',
	styleUrls: ['./edit-charge.component.css']
})
export class EditChargeComponent {
	data: ICharge | null;

	constructor(activatedRoute: ActivatedRoute) {
		this.data = activatedRoute.snapshot.data['chargeData'];
	}
}
