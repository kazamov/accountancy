import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';

import { ChargesStore } from './charges.store';
import { ChargesDataService } from './charges-data.service';
import { IChargeData, createCharge } from './charge.model';

@Injectable()
export class ChargesService {
	constructor(
		private chargesStore: ChargesStore,
		private chargesDataService: ChargesDataService,
		private router: Router
	) {}

	getCharges() {
		this.chargesStore.setLoading(true);
		this.chargesDataService.getCharges().subscribe(
			charges => {
				this.chargesStore.setLoading(false);
				this.chargesStore.set(charges);
			},
			() => this.chargesStore.setLoading(false)
		);
	}

	getCharge(id: ID) {
		this.chargesStore.setLoading(true);
		this.chargesDataService.getCharge(id).subscribe(
			charge => {
				if (charge) {
					this.chargesStore.setLoading(false);
					this.chargesStore.add(charge);
				}
			},
			() => this.chargesStore.setLoading(false)
		);
	}

	deleteCharge(id: ID) {
		this.chargesStore.setLoading(true);
		this.chargesDataService.deleteCharge(id).subscribe(
			deleteResult => {
				if (deleteResult) {
					this.chargesStore.setLoading(false);
					this.chargesStore.remove(id);
				}
			},
			() => this.chargesStore.setLoading(false)
		);
	}

	addCharge(chargeData: IChargeData) {
		this.chargesStore.setLoading(true);
		this.chargesDataService.addCharge(chargeData).subscribe(
			id => {
				if (id) {
					this.chargesStore.setLoading(false);
					this.chargesStore.add(createCharge(id, chargeData));
					this.router.navigate(['charges']);
				}
			},
			() => this.chargesStore.setLoading(false)
		);
	}

	updateCharge(id: ID, chargeData: IChargeData) {
		this.chargesStore.setLoading(true);
		this.chargesDataService.updateCharge(id, chargeData).subscribe(
			result => {
				if (result) {
					this.chargesStore.setLoading(false);
					this.chargesStore.update(id, chargeData);
					this.router.navigate(['charges']);
				}
			},
			() => this.chargesStore.setLoading(false)
		);
	}
}
