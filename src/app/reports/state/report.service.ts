import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IReport, ISearchCriteria, IPreparedReport } from 'data';

import { ReportStore, createInitialState } from './report.store';
import { CategoryNamePipe } from '../../shared/category-name.pipe';

@Injectable()
export class ReportService {
	private onCreateChargesReportFunction: (
		data: ISearchCriteria
	) => Observable<IReport>;

	constructor(
		private afFunctions: AngularFireFunctions,
		private reportStore: ReportStore,
		private router: Router,
		private categoryNamePipe: CategoryNamePipe
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
					const preparedReport: IPreparedReport = {
						groups: report.groups.map(group => {
							return {
								groupName: this.categoryNamePipe.transform(
									group.groupId
								),
								total: group.total
							};
						}),
						total: report.total
					};

					this.reportStore.setState(state => {
						return {
							...state,
							report: preparedReport
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
