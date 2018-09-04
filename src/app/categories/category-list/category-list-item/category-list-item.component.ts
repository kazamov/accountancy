import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ID } from '@datorama/akita';

import { ICategory } from '../../state/category.model';

@Component({
	selector: 'app-category-list-item',
	templateUrl: './category-list-item.component.html',
	styleUrls: ['./category-list-item.component.css']
})
export class CategoryListItemComponent {
	@Input()
	category: ICategory | null = null;

	@Output()
	deleteCategory = new EventEmitter<ID>();
	@Output()
	updateCategory = new EventEmitter<ICategory>();

	constructor() {}

	onDelete() {
		if (this.category) {
			this.deleteCategory.emit(this.category.id);
		}
	}

	onUpdate() {
		if (this.category) {
			this.updateCategory.emit(this.category);
		}
	}
}