import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ICategory } from 'data';

@Component({
	selector: 'app-delete-category-dialog',
	templateUrl: './delete-category-dialog.component.html',
	styleUrls: ['./delete-category-dialog.component.scss']
})
export class DeleteCategoryDialogComponent implements OnInit {
	categoryName = '';

	constructor(@Inject(MAT_DIALOG_DATA) public data: Partial<ICategory>) {}

	ngOnInit() {
		this.categoryName = this.data.name || '';
	}
}
