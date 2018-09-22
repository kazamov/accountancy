import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IReport } from './report.store';

export interface ISearchCriteria {
	startDate: null | number;
	endDate: null | number;
}

@Injectable()
export class ReportService {
	private onCreateChargesReportFunction: (
		data: ISearchCriteria
	) => Observable<IReport>;

	constructor(private afFunctions: AngularFireFunctions) {
		this.onCreateChargesReportFunction = this.afFunctions.httpsCallable(
			'onCreateChargesReport'
		);
	}

	generateReport(searchCriteria: ISearchCriteria) {
		this.onCreateChargesReportFunction(searchCriteria)
			.pipe(take(1))
			.subscribe(
				report => {
					console.log(report);
				},
				error => console.log(error)
			);
	}
}
