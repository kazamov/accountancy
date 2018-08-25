import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ICharge } from '../../charge.interface';

@Component({
	selector: 'app-charge-form',
	templateUrl: './charge-form.component.html',
	styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {
	form: FormGroup;

	@Input()
	data: ICharge | null = null;

	categories = [
		'Продукты',
		'Проезд',
		'Здоровье',
		'Отдых и развлечения',
		'Церковь'
	];

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
}
