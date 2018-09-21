import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
	form: FormGroup;
	onCreateChargesReportFunction: (data: any) => Observable<any>;

	@ViewChild(MatDatepicker)
	picker: MatDatepicker<Date> | null = null;

	constructor(private afFunctions: AngularFireFunctions) {
		this.form = new FormGroup({
			startDate: new FormControl(''),
			endDate: new FormControl('')
		});

		this.onCreateChargesReportFunction = this.afFunctions.httpsCallable(
			'onCreateChargesReport'
		);
	}

	onDateMouseDown(event: MouseEvent, picker: MatDatepicker<Date>) {
		event.cancelBubble = true;
		event.preventDefault();

		picker.open();

		return false;
	}

	onSubmit() {
		console.log(this.form.value);

		this.onCreateChargesReportFunction({
			startDate: (this.form.value['startDate'] as Date).getTime(),
			endDate: (this.form.value['endDate'] as Date).getTime()
		})
			.pipe(take(1))
			.subscribe(
				report => {
					console.log(report);
				},
				error => console.log(error)
			);
	}
}
