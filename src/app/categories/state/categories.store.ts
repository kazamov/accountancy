import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { ICategory } from './category.model';

export interface CategoriesState extends EntityState<ICategory> {}

@Injectable()
@StoreConfig({ name: 'categories' })
export class CategoriesStore extends EntityStore<CategoriesState, ICategory> {
	constructor() {
		super();
	}
}
