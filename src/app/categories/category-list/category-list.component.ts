import { Component } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ICategory } from '../state/category.model';
import { CategoriesQuery } from '../state/categories.query';
import { CategoriesService } from '../state/categories.service';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
	categories$: Observable<ICategory[]>;
	count$: Observable<number>;

	constructor(
		private categoriesQuery: CategoriesQuery,
		private categoriesService: CategoriesService
	) {
		this.count$ = this.categoriesQuery.selectCount();
		this.categories$ = this.categoriesQuery.selectAll();
	}

	onCategoryDelete(id: ID) {
		this.categoriesService.deleteCategory(id);
	}
}
