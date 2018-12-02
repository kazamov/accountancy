import { Pipe, PipeTransform } from '@angular/core';

import { CategoriesQuery } from '../categories/state/categories.query';

@Pipe({
	name: 'categoryName',
	pure: true
})
export class CategoryNamePipe implements PipeTransform {
	constructor(private categoriesQuery: CategoriesQuery) {}

	transform(categoryId: string): string {
		const category = this.categoriesQuery.getEntity(categoryId);
		return category.name;
	}
}
