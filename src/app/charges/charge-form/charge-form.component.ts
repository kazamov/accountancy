import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

	ngOnInit() {
		this.form = new FormGroup({
			price: new FormControl(''),
			date: new FormControl(''),
			category: new FormControl(''),
			description: new FormControl('')
		});
	}
}
