import {
	Component,
	OnInit,
	Input,
	ViewChild,
	Output,
	EventEmitter
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';

import { ICharge } from '../../state/charge.model';
import { Observable } from 'rxjs';
import { ICategory } from '../../../categories/state/category.model';
import { CategoriesQuery } from '../../../categories/state/categories.query';

@Component({
	selector: 'app-charge-form',
	templateUrl: './charge-form.component.html',
	styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {
	form: FormGroup;
	categories$: Observable<ICategory[]>;

	@ViewChild(MatDatepicker)
	picker: MatDatepicker<Date> | null = null;

	@Input()
	data: ICharge | null = null;

	@Output()
	submitCharge = new EventEmitter<Partial<ICharge>>();

	constructor(private categoriesQuery: CategoriesQuery) {
		this.categories$ = this.categoriesQuery.selectAll();

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

	onSubmit() {
		this.submitCharge.emit({
			...this.form.value
		});
	}
}
