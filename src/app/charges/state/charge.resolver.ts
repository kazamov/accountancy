import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ICharge } from './charge.model';
import { ChargesQuery } from './charges.query';
import { ChargesService } from './charges.service';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class ChargeResolver implements Resolve<ICharge | null> {
	constructor(
		private chargesQuery: ChargesQuery,
		private chargesService: ChargesService
	) {}

	resolve(route: ActivatedRouteSnapshot) {
		const id = route.params['id'] || '';
		const charge = this.chargesQuery.getEntity(id);
		if (charge) {
			return charge;
		} else {
			this.chargesService.getCharge(id);
			return this.chargesQuery.selectEntity<ICharge>(id).pipe(
				filter(ch => Boolean(ch)),
				take(1)
			);
		}
	}
}
