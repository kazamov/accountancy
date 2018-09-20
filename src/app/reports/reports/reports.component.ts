import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
	form: FormGroup;

	@ViewChild(MatDatepicker)
	picker: MatDatepicker<Date> | null = null;

	constructor() {
		this.form = new FormGroup({
			startDate: new FormControl(''),
			endDate: new FormControl('')
		});
	}

	onDateMouseDown(event: MouseEvent, picker: MatDatepicker<Date>) {
		event.cancelBubble = true;
		event.preventDefault();

		picker.open();

		return false;
	}

	onSubmit() {
		console.log(this.form.value);
	}
}
