import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ChargesQuery } from '../state/charges.query';
import { ICharge } from '../state/charge.model';
import { ChargesService } from '../state/charges.service';
import { UiService } from '../../ui.service';

@Component({
	selector: 'app-charges',
	templateUrl: './charges.component.html',
	styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {
	charges$: Observable<ICharge[]>;
	isEmpty = false;

	constructor(
		private chargesService: ChargesService,
		private chargesQuery: ChargesQuery,
		private uiService: UiService
	) {
		this.chargesQuery.selectLoading().subscribe(isLoading => {
			if (isLoading) {
				this.uiService.showLoading();
				this.isEmpty = false;
			} else {
				this.uiService.hideLoading();
				this.isEmpty = this.chargesQuery.isEmpty();
			}
		});
		this.charges$ = this.chargesQuery.selectAll();
	}

	ngOnInit() {
		this.chargesService.getCharges();
	}

	onDeleteCard(chargeId: string) {
		console.log(chargeId);
	}
}
