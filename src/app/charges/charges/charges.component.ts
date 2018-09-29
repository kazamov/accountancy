import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ChargesQuery } from '../state/charges.query';
import { ICharge } from '../state/charge.model';
import { ChargesService } from '../state/charges.service';

@Component({
	selector: 'app-charges',
	templateUrl: './charges.component.html',
	styleUrls: ['./charges.component.scss']
})
export class ChargesComponent {
	charges$: Observable<ICharge[]>;
	count$: Observable<number>;
	allChargesLoaded$: Observable<boolean>;

	constructor(
		private chargesService: ChargesService,
		private chargesQuery: ChargesQuery
	) {
		this.count$ = this.chargesQuery.selectCount();
		this.charges$ = this.chargesQuery.selectAll();
		this.allChargesLoaded$ = this.chargesQuery.allChargesLoaded$;
	}

	onDeleteCard(chargeId: string) {
		this.chargesService.deleteCharge(chargeId);
	}

	onLoadMoreCharges() {
		this.chargesService.getCharges();
	}
}
