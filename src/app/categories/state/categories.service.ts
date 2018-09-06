import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { CategoriesDataService } from './categories-data.service';
import { CategoriesStore } from './categories.store';
import { createCategory } from './category.model';

@Injectable()
export class CategoriesService {
	constructor(
		private categoriesStore: CategoriesStore,
		private categoriesDataService: CategoriesDataService
	) {}

	getCategories() {
		this.categoriesStore.setLoading(true);
		this.categoriesDataService.getCategories().subscribe(
			categories => {
				this.categoriesStore.setLoading(false);
				this.categoriesStore.set(categories);
			},
			() => this.categoriesStore.setLoading(false)
		);
	}

	deleteCategory(id: ID) {
		this.categoriesStore.setLoading(true);
		this.categoriesDataService.deleteCategory(id).subscribe(
			result => {
				if (result) {
					this.categoriesStore.setLoading(false);
					this.categoriesStore.remove(id);
				}
			},
			() => this.categoriesStore.setLoading(false)
		);
	}

	addCategory(name: string) {
		this.categoriesStore.setLoading(true);
		this.categoriesDataService.addCategory(name).subscribe(
			newId => {
				if (newId) {
					this.categoriesStore.setLoading(false);
					this.categoriesStore.add(createCategory(newId, name));
				}
			},
			() => this.categoriesStore.setLoading(false)
		);
	}

	updateCategory(id: ID, name: string) {
		this.categoriesStore.setLoading(true);
		this.categoriesDataService.updateCategory(id, name).subscribe(
			result => {
				if (result) {
					this.categoriesStore.setLoading(false);
					this.categoriesStore.update(id, { name });
				}
			},
			() => this.categoriesStore.setLoading(false)
		);
	}
}
