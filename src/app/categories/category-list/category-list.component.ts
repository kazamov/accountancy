import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ICategory } from 'data';

import { CategoriesQuery } from '../state/categories.query';
import { CategoriesService } from '../state/categories.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';

@Component({
	selector: 'app-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
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

	onCategoryDeleteStart(category: ICategory) {
		const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
			data: { name: category.name }
		});

		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.onCategoryDeleteEnd(category.id);
			}
		});
	}

	onCategoryDeleteEnd(id: string) {
		this.categoriesService.deleteCategory(id);
	}

	onCategoryCreateStart() {
		const dialogRef = this.dialog.open(CategoryDialogComponent);

		dialogRef.afterClosed().subscribe((categoryName: string) => {
			if (categoryName) {
				this.onCategoryCreateEnd(categoryName);
			}
		});
	}

	onCategoryCreateEnd(name: string) {
		this.categoriesService.addCategory(name);
	}

	onCategoryUpdateStart(category: ICategory) {
		const dialogRef = this.dialog.open(CategoryDialogComponent, {
			data: { ...category }
		});

		dialogRef.afterClosed().subscribe((categoryName: string | null) => {
			if (categoryName) {
				this.onCategoryUpdateEnd(category.id, categoryName);
			}
		});
	}

	onCategoryUpdateEnd(id: string, name: string) {
		this.categoriesService.updateCategory(id, name);
	}
}
