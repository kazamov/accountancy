import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { filter, take } from 'rxjs/operators';
import { CategoriesQuery } from './categories.query';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoriesResolver implements Resolve<boolean> {
	constructor(
		private categoriesQuery: CategoriesQuery,
		private chargesService: CategoriesService
	) {}

	resolve() {
		this.chargesService.getCategories();
		return this.categoriesQuery.selectLoading().pipe(
			filter(isLoading => !isLoading),
			take(1)
		);
	}
}
