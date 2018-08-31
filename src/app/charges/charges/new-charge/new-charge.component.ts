import { Component, OnInit, OnDestroy } from '@angular/core';
import { guid } from '@datorama/akita';
import { Subscription } from 'rxjs';

import { ICharge } from '../../state/charge.model';
import { ChargesService } from '../../state/charges.service';
import { UiService } from '../../../ui.service';
import { ChargesQuery } from '../../state/charges.query';

@Component({
	selector: 'app-new-charge',
	templateUrl: './new-charge.component.html',
	styleUrls: ['./new-charge.component.css']
})
export class NewChargeComponent implements OnInit, OnDestroy {
	isLoading$: Subscription | null = null;

	constructor(
		private chargesService: ChargesService,
		private uiService: UiService,
		private chargesQuery: ChargesQuery
	) {}

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

	onCreateCharge(chargeData: ICharge) {
		const newCharge = {
			id: guid(),
			...chargeData
		};
		this.chargesService.addCharge(newCharge);
	}
}
