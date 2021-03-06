import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

import { ReportService } from '../../state/report.service';

@Component({
	selector: 'app-reports-search-form',
	templateUrl: './reports-search-form.component.html',
	styleUrls: ['./reports-search-form.component.scss']
})
export class ReportsSearchFormComponent {
	form: FormGroup;
	startDateControl: FormControl;
	endDateControl: FormControl;

	constructor(private reportService: ReportService) {
		this.form = new FormGroup({});

		this.startDateControl = new FormControl('');
		this.form.registerControl('startDate', this.startDateControl);

		this.endDateControl = new FormControl('');
		this.form.registerControl('endDate', this.endDateControl);
	}

	onDateMouseDown(event: MouseEvent, picker: MatDatepicker<Date>) {
		event.cancelBubble = true;
		event.preventDefault();

		picker.open();

		return false;
	}

	onSubmit() {
		let startDate: number | null = null;
		if (this.startDateControl.value) {
			startDate = (this.startDateControl.value as Date).getTime();
		}

		let endDate: number | null = null;
		if (this.endDateControl.value) {
			endDate = (this.endDateControl.value as Date).getTime();
		}

		this.reportService.forwardToReport({
			startDate: startDate,
			endDate: endDate
		});
	}
}
