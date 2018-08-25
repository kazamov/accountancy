import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICharge } from '../../charge.interface';
import { ChargesService } from '../../charges.service';

@Component({
	selector: 'app-edit-charge',
	templateUrl: './edit-charge.component.html',
	styleUrls: ['./edit-charge.component.css']
})
export class EditChargeComponent {
	data: ICharge | null;

	constructor(
		activatedRoute: ActivatedRoute,
		chargesService: ChargesService
	) {
		this.data = chargesService.getCharge(
			activatedRoute.snapshot.paramMap.get('id') || ''
		);
	}
}
