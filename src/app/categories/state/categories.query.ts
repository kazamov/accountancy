import { Injectable } from '@angular/core';
import { QueryEntity, Order } from '@datorama/akita';

import { CategoriesStore, CategoriesState } from './categories.store';
import { ICategory } from './category.model';

@Injectable()
export class CategoriesQuery extends QueryEntity<CategoriesState, ICategory> {
	constructor(protected store: CategoriesStore) {
		super(store);
	}

	selectAllSortedByName() {
		return this.selectAll({ sortBy: 'name', sortByOrder: Order.ASC });
	}
}
