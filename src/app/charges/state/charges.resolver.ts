import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ChargesQuery } from './charges.query';
import { ChargesService } from './charges.service';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class ChargesResolver implements Resolve<boolean> {
	constructor(
		private chargesQuery: ChargesQuery,
		private chargesService: ChargesService
	) {}

	resolve() {
		const charges = this.chargesQuery.getAll();
		if (charges.length) {
			return true;
		} else {
			this.chargesService.getCharges();
			return this.chargesQuery.selectLoading().pipe(
				filter(isLoading => !isLoading),
				take(1)
			);
		}
	}
}
