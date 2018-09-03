import { Injectable } from '@angular/core';
import { ID, remove, push, update } from '@datorama/akita';

import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { ICategory } from './category.model';

let categories: ICategory[] = [
	{
		id: '223',
		name: 'Продукты'
	},
	{
		id: '224',
		name: 'Здоровье'
	},
	{
		id: '225',
		name: 'Проезд'
	}
];

@Injectable()
export class CategoriesDataService {
	getCategories() {
		return timer(2000).pipe(mapTo([...categories]));
	}

	deleteCategory(id: ID) {
		const categoryIndex = categories.findIndex(
			category => category.id === id
		);
		categories = remove(categories, categoryIndex);

		return timer(500).pipe(mapTo(true));
	}

	addCategory(categoryData: ICategory) {
		categories = push(categories, categoryData);

		return timer(500).pipe(mapTo(true));
	}

	updateCategory(categoryData: ICategory) {
		const categoryIndex = categories.findIndex(
			category => category.id === categoryData.id
		);
		categories = update(categories, categoryIndex, categoryData);

		return timer(500).pipe(mapTo(true));
	}
}
