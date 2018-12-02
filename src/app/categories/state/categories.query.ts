import { Injectable } from '@angular/core';
import { QueryEntity, Order } from '@datorama/akita';
import { ICategory } from 'data';

import { CategoriesStore, CategoriesState } from './categories.store';

@Injectable()
export class CategoriesQuery extends QueryEntity<CategoriesState, ICategory> {
	constructor(protected store: CategoriesStore) {
		super(store);
	}

	selectAllSortedByName() {
		return this.selectAll({ sortBy: 'name', sortByOrder: Order.ASC });
	}
}
