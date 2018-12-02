import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ChargesStore } from './charges.store';
import { ChargesDataService } from './charges-data.service';
import { IChargeData, createCharge } from './charge.model';
import { ChargesQuery } from './charges.query';

@Injectable()
export class ChargesService {
	constructor(
		private chargesStore: ChargesStore,
		private chargesQuery: ChargesQuery,
		private chargesDataService: ChargesDataService,
		private router: Router
	) {}

	getCharges() {
		const chargesUiSettings = this.chargesQuery.getSnapshot().ui;

		this.chargesStore.setLoading(true);
		this.chargesDataService
			.getCharges(chargesUiSettings.pageSize, chargesUiSettings.lastItem)
			.subscribe(
				charges => {
					if (charges.length < chargesUiSettings.pageSize) {
						this.chargesStore.updateAllItemsLoaded(true);
					}
					if (charges.length) {
						this.chargesStore.updateLastItem(
							charges[charges.length - 1]
						);
					}

					this.chargesStore.setLoading(false);
					this.chargesStore.add(charges);
				},
				() => this.chargesStore.setLoading(false)
			);
	}

	getCharge(id: string) {
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

	async deleteCharge(id: string) {
		try {
			this.chargesStore.setLoading(true);
			await this.chargesDataService.deleteCharge(id);
			this.chargesStore.remove(id);
		} catch (error) {
			console.log(error);
		} finally {
			this.chargesStore.setLoading(false);
		}
	}

	async addCharge(chargeData: IChargeData) {
		try {
			this.chargesStore.setLoading(true);
			const newId = await this.chargesDataService.addCharge(chargeData);
			if (newId) {
				this.chargesStore.add(createCharge(newId, chargeData));
				this.router.navigate(['charges']);
			}
		} catch (error) {
			console.log(error);
		} finally {
			this.chargesStore.setLoading(false);
		}
	}

	async updateCharge(id: string, chargeData: IChargeData) {
		try {
			this.chargesStore.setLoading(true);
			await this.chargesDataService.updateCharge(id, chargeData);
			this.chargesStore.update(id, chargeData);
			this.router.navigate(['charges']);
		} catch (error) {
			console.log(error);
		} finally {
			this.chargesStore.setLoading(false);
		}
	}
}
