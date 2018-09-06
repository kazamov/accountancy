import { Injectable } from '@angular/core';
import { ID, remove, push, update, guid } from '@datorama/akita';

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

	addCategory(name: string) {
		const newCategoryId = guid();
		categories = push(categories, {
			id: newCategoryId,
			name: name
		});

		return timer(500).pipe(mapTo(newCategoryId));
	}

	updateCategory(id: ID, name: string) {
		const categoryIndex = categories.findIndex(
			category => category.id === id
		);
		categories = update(categories, categoryIndex, { id, name });

		return timer(500).pipe(mapTo(true));
	}
}
