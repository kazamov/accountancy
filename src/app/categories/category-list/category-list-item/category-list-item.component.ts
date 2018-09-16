import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICategory } from '../../state/category.model';

@Component({
	selector: 'app-category-list-item',
	templateUrl: './category-list-item.component.html',
	styleUrls: ['./category-list-item.component.scss']
})
export class CategoryListItemComponent {
	@Input()
	category: ICategory | null = null;

	@Output()
	deleteCategory = new EventEmitter<ICategory>();
	@Output()
	updateCategory = new EventEmitter<ICategory>();

	constructor() {}

	onDelete() {
		if (this.category) {
			this.deleteCategory.emit(this.category);
		}
	}

	onUpdate() {
		if (this.category) {
			this.updateCategory.emit(this.category);
		}
	}
}
