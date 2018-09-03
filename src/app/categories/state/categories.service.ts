import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { CategoriesDataService } from './categories-data.service';
import { CategoriesStore } from './categories.store';
import { ICategory } from './category.model';

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

	addCategory(categoryData: ICategory) {
		this.categoriesStore.setLoading(true);
		this.categoriesDataService.addCategory(categoryData).subscribe(
			result => {
				if (result) {
					this.categoriesStore.setLoading(false);
					this.categoriesStore.add(categoryData);
				}
			},
			() => this.categoriesStore.setLoading(false)
		);
	}

	updateCategory(categoryData: ICategory) {
		this.categoriesStore.setLoading(true);
		this.categoriesDataService.updateCategory(categoryData).subscribe(
			result => {
				if (result) {
					this.categoriesStore.setLoading(false);
					this.categoriesStore.update(categoryData.id, categoryData);
				}
			},
			() => this.categoriesStore.setLoading(false)
		);
	}
}
