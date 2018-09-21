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
	startDateControl: FormControl;
	endDateControl: FormControl;
	onCreateChargesReportFunction: (data: any) => Observable<any>;

	@ViewChild(MatDatepicker)
	picker: MatDatepicker<Date> | null = null;

	constructor(private afFunctions: AngularFireFunctions) {
		this.form = new FormGroup({});

		this.startDateControl = new FormControl('');
		this.form.registerControl('startDate', this.startDateControl);

		this.endDateControl = new FormControl('');
		this.form.registerControl('endDate', this.endDateControl);

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

		let startDate: number | null = null;
		if (this.startDateControl.value) {
			startDate = (this.startDateControl.value as Date).getTime();
		}

		let endDate: number | null = null;
		if (this.endDateControl.value) {
			endDate = (this.endDateControl.value as Date).getTime();
		}

		this.onCreateChargesReportFunction({
			startDate: startDate,
			endDate: endDate
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
