import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of, combineLatest } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { ICharge } from 'data';

import { ChargesQuery } from './charges.query';
import { ChargesService } from './charges.service';
import { CategoriesService } from '../../categories/state/categories.service';
import { CategoriesQuery } from '../../categories/state/categories.query';

@Injectable()
export class ChargeResolver implements Resolve<ICharge | null> {
	constructor(
		private chargesQuery: ChargesQuery,
		private chargesService: ChargesService,
		private categoriesService: CategoriesService,
		private categoriesQuery: CategoriesQuery
	) {}

	resolve(route: ActivatedRouteSnapshot) {
		const id = route.params['id'] || '';
		const charge = this.chargesQuery.getEntity(id);
		if (charge) {
			return of(charge);
		} else {
			this.chargesService.getCharge(id);
			this.categoriesService.getCategories();

			return combineLatest([
				this.chargesQuery.selectEntity<ICharge>(id).pipe(
					filter(ch => Boolean(ch)),
					take(1)
				),
				this.categoriesQuery.selectLoading().pipe(
					filter(isLoading => !isLoading),
					take(1)
				)
			]).pipe(
				take(1),
				map(([chargeData]) => chargeData)
			);
		}
	}
}
