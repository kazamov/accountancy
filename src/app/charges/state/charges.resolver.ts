import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { filter, take, map, catchError } from 'rxjs/operators';

import { ChargesQuery } from './charges.query';
import { ChargesService } from './charges.service';
import { CategoriesService } from '../../categories/state/categories.service';
import { CategoriesQuery } from '../../categories/state/categories.query';
import { ChargesStore } from './charges.store';

@Injectable()
export class ChargesResolver implements Resolve<boolean> {
	constructor(
		private chargesQuery: ChargesQuery,
		private categoriesQuery: CategoriesQuery,
		private chargesService: ChargesService,
		private categoriesService: CategoriesService,
		private chargesStore: ChargesStore
	) {}

	resolve() {
		this.chargesStore.update(state => {
			return {
				...state,
				ui: {
					...state.ui,
					allItemsLoaded: false,
					lastItem: null
				}
			};
		});
		this.chargesStore.set([]);

		this.chargesService.getCharges();
		this.categoriesService.getCategories();

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
			),
			catchError(error => {
				console.log(error);
				return of(false);
			})
		);
	}
}
