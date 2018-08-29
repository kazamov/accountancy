import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

import { ICharge } from '../../state/charge.model';

@Component({
	selector: 'app-charge-form',
	templateUrl: './charge-form.component.html',
	styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {
	form: FormGroup;
	categories = [
		'Продукты',
		'Проезд',
		'Здоровье',
		'Отдых и развлечения',
		'Церковь'
	];
	@ViewChild(MatDatepicker)
	picker: MatDatepicker<Date> | null = null;

	@Input()
	data: ICharge | null = null;

	constructor() {
		this.form = new FormGroup({
			price: new FormControl(''),
			date: new FormControl(''),
			category: new FormControl(''),
			description: new FormControl('')
		});
	}

	ngOnInit() {
		if (this.data) {
			this.form.setValue({
				price: this.data.price,
				date: this.data.date,
				category: this.data.category,
				description: this.data.description
			});
		}
	}

	onDateMouseDown(event: MouseEvent) {
		event.cancelBubble = true;
		event.preventDefault();

		if (this.picker) {
			this.picker.open();
		}

		return false;
	}
}
