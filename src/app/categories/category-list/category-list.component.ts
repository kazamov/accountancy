import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ID, guid } from '@datorama/akita';
import { Observable } from 'rxjs';

import { ICategory } from '../state/category.model';
import { CategoriesQuery } from '../state/categories.query';
import { CategoriesService } from '../state/categories.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

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
		private categoriesService: CategoriesService,
		public dialog: MatDialog
	) {
		this.count$ = this.categoriesQuery.selectCount();
		this.categories$ = this.categoriesQuery.selectAllSortedByName();
	}

	onCategoryDelete(id: ID) {
		this.categoriesService.deleteCategory(id);
	}

	onCategoryCreateStart() {
		const dialogRef = this.dialog.open(CategoryDialogComponent);

		dialogRef.afterClosed().subscribe((categoryName: string) => {
			if (categoryName) {
				this.onCategoryCreateEnd(guid(), categoryName);
			}
		});
	}

	onCategoryCreateEnd(id: ID, name: string) {
		this.categoriesService.addCategory({
			id,
			name
		});
	}

	onCategoryUpdateStart(category: ICategory) {
		const dialogRef = this.dialog.open(CategoryDialogComponent, {
			data: { ...category }
		});

		dialogRef.afterClosed().subscribe((categoryName: string) => {
			if (categoryName) {
				this.onCategoryUpdateEnd(category.id, categoryName);
			}
		});
	}

	onCategoryUpdateEnd(id: ID, name: string) {
		this.categoriesService.updateCategory({
			id,
			name
		});
	}
}
