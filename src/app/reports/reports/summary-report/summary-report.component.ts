import { Component, OnInit } from '@angular/core';

import { IGroup } from '../../state/report.store';
import { ReportQuery } from '../../state/report.query';
import { ReportService } from '../../state/report.service';

@Component({
	selector: 'app-summary-report',
	templateUrl: './summary-report.component.html',
	styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {
	displayedColumns = ['category', 'sum'];
	dataSource: IGroup[] = [];
	total = 0;

	constructor(
		private reportQuery: ReportQuery,
		private reportService: ReportService
	) {}

	ngOnInit() {
		const report = this.reportQuery.getSnapshot().report;
		if (report) {
			this.dataSource = report.groups;
			this.total = report.total;
		}
	}

	onBackToSearchForm() {
		this.reportService.backwardToSearchForm();
	}
}
