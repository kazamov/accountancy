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

	async deleteCategory(id: ID) {
		try {
			this.categoriesStore.setLoading(true);
			await this.categoriesDataService.deleteCategory(id);
			this.categoriesStore.remove(id);
		} catch (error) {
			console.log(error);
		} finally {
			this.categoriesStore.setLoading(false);
		}
	}

	async addCategory(name: string) {
		try {
			this.categoriesStore.setLoading(true);
			const newId = await this.categoriesDataService.addCategory(name);
			if (newId) {
				this.categoriesStore.add(createCategory(newId, name));
			}
		} catch (error) {
			console.log(error);
		} finally {
			this.categoriesStore.setLoading(false);
		}
	}

	async updateCategory(id: ID, name: string) {
		try {
			this.categoriesStore.setLoading(true);
			await this.categoriesDataService.updateCategory(id, name);
			this.categoriesStore.update(id, { name });
		} catch (error) {
			console.log(error);
		} finally {
			this.categoriesStore.setLoading(false);
		}
	}
}
