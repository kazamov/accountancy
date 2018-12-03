import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IReport, ISearchCriteria } from 'data';

import { ReportStore, createInitialState } from './report.store';

@Injectable()
export class ReportService {
	private onCreateChargesReportFunction: (
		data: ISearchCriteria
	) => Observable<IReport>;

	constructor(
		private afFunctions: AngularFireFunctions,
		private reportStore: ReportStore,
		private router: Router
	) {
		this.onCreateChargesReportFunction = this.afFunctions.httpsCallable(
			'onCreateChargesReport'
		);
	}

	generateReport(searchCriteria: ISearchCriteria) {
		this.reportStore.setLoading(true);
		this.onCreateChargesReportFunction(searchCriteria)
			.pipe(take(1))
			.subscribe(
				report => {
					console.log(report);
					this.reportStore.setState(state => {
						return {
							...state,
							report
						};
					});
					this.reportStore.setLoading(false);
				},
				error => {
					console.log(error);
					this.reportStore.setLoading(false);
				}
			);
	}

	backwardToSearchForm() {
		this.reportStore.setState(state => {
			return {
				...state,
				...createInitialState()
			};
		});
		this.router.navigate(['/reports']);
	}

	forwardToReport(searchCriteria: ISearchCriteria) {
		this.reportStore.setState(state => {
			return {
				...state,
				criteria: searchCriteria
			};
		});
		this.router.navigate(['/reports', 'summary']);
	}
}
