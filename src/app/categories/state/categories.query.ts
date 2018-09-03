import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { CategoriesStore, CategoriesState } from './categories.store';
import { ICategory } from './category.model';

@Injectable()
export class CategoriesQuery extends QueryEntity<CategoriesState, ICategory> {
	constructor(protected store: CategoriesStore) {
		super(store);
	}
}
