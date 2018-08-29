import { Injectable } from '@angular/core';

import { ChargesStore } from './charges.store';
import { ChargesDataService } from './charges-data.service';

@Injectable()
export class ChargesService {
	constructor(
		private chargesStore: ChargesStore,
		private chargesDataService: ChargesDataService
	) {}

	getCharges() {
		this.chargesDataService.getCharges().subscribe(charges => {
			this.chargesStore.set(charges);
		});
	}
}
