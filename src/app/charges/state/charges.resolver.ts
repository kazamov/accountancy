import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ChargesQuery } from './charges.query';
import { ChargesService } from './charges.service';
import { filter, take, map } from 'rxjs/operators';
import { CategoriesService } from '../../categories/state/categories.service';
import { combineLatest } from 'rxjs';
import { CategoriesQuery } from '../../categories/state/categories.query';

@Injectable()
export class ChargesResolver implements Resolve<boolean> {
	constructor(
		private chargesQuery: ChargesQuery,
		private categoriesQuery: CategoriesQuery,
		private chargesService: ChargesService,
		private categoriesService: CategoriesService
	) {}

	resolve() {
		this.chargesService.getCharges();
		this.categoriesService.getCategories();

		/*return this.chargesQuery.selectLoading().pipe(
			filter(isLoading => !isLoading),
			take(1)
		);*/

		return combineLatest(
			this.chargesQuery.selectLoading().pipe(
				filter(isLoading => !isLoading),
				take(1)
			),
			this.categoriesQuery.selectLoading().pipe(
				filter(isLoading => !isLoading),
				take(1)
			)
		).pipe(
			take(1),
			map(
				([isChargesLoaded, isCategoriesLoaded]) =>
					isChargesLoaded && isCategoriesLoaded
			)
		);
	}
}
