import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';

import { CategoriesService } from '../../categories/state/categories.service';
import { CategoriesQuery } from '../../categories/state/categories.query';
import { ReportQuery } from './report.query';
import { ReportService } from './report.service';
import { ISearchCriteria } from './report.store';

@Injectable()
export class ReportResolver implements Resolve<boolean> {
	constructor(
		private categoriesService: CategoriesService,
		private categoriesQuery: CategoriesQuery,
		private reportQuery: ReportQuery,
		private reportService: ReportService
	) {}

	resolve() {
		this.categoriesService.getCategories();

		const criteria: ISearchCriteria = this.reportQuery.getSnapshot()
			.criteria;
		this.reportService.generateReport(criteria);

		return combineLatest(
			this.reportQuery.selectLoading().pipe(
				filter(isLoading => !isLoading),
				take(1)
			),
			this.categoriesQuery.selectLoading().pipe(
				filter(isLoading => !isLoading),
				take(1)
			)
		).pipe(
			take(1),
			map(
				([isReportLoaded, isCategoriesLoaded]) =>
					isReportLoaded && isCategoriesLoaded
			)
		);
	}
}
