import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { CategoriesService } from '../../categories/state/categories.service';
import { CategoriesQuery } from '../../categories/state/categories.query';

@Injectable()
export class NewChargeResolver implements Resolve<boolean> {
	constructor(
		private categoriesService: CategoriesService,
		private categoriesQuery: CategoriesQuery
	) {}

	resolve() {
		const categories = this.categoriesQuery.getAll();
		if (categories.length) {
			return of(false);
		} else {
			this.categoriesService.getCategories();

			return this.categoriesQuery.selectLoading().pipe(
				filter(isLoading => !isLoading),
				take(1)
			);
		}
	}
}
