import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICharge } from '../../state/charge.model';
import { ChargesService } from '../../state/charges.service';
import { ChargesQuery } from '../../state/charges.query';
import { UiService } from '../../../ui.service';

@Component({
	selector: 'app-edit-charge',
	templateUrl: './edit-charge.component.html',
	styleUrls: ['./edit-charge.component.css']
})
export class EditChargeComponent implements OnInit, OnDestroy {
	data: ICharge | null = null;
	isLoading$: Subscription | null = null;

	constructor(
		activatedRoute: ActivatedRoute,
		private chargesService: ChargesService,
		private chargesQuery: ChargesQuery,
		private uiService: UiService
	) {
		this.data = activatedRoute.snapshot.data['chargeData'];
	}

	ngOnInit() {
		this.isLoading$ = this.chargesQuery
			.selectLoading()
			.subscribe(
				isLoading =>
					isLoading
						? this.uiService.showLoading()
						: this.uiService.hideLoading()
			);
	}

	ngOnDestroy() {
		if (this.isLoading$) {
			this.isLoading$.unsubscribe();
		}
	}

	onUpdateCharge(chargeData: ICharge) {
		const updatedCharge = {
			...this.data,
			...chargeData
		};
		this.chargesService.updateCharge(updatedCharge);
	}
}
