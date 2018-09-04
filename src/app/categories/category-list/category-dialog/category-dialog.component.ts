import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ICategory } from '../../state/category.model';

@Component({
	selector: 'app-category-dialog',
	templateUrl: './category-dialog.component.html',
	styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {
	categoryNameInput: FormControl;

	constructor(
		public dialogRef: MatDialogRef<CategoryDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		@Optional()
		public data: Partial<ICategory> | null
	) {
		this.categoryNameInput = new FormControl('', [Validators.required]);
	}

	ngOnInit() {
		if (this.data) {
			this.categoryNameInput.setValue(this.data.name);
		}
	}

	onCancelClick() {
		this.dialogRef.close();
	}
}
