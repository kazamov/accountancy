import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { IGroup } from 'data';

import { ReportQuery } from '../../state/report.query';
import { ReportService } from '../../state/report.service';

@Component({
	selector: 'app-summary-report',
	templateUrl: './summary-report.component.html',
	styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {
	displayedColumns = ['category', 'sum'];
	dataSource: MatTableDataSource<IGroup>;
	total = 0;

	@ViewChild(MatSort) sort: MatSort | null = null;

	constructor(
		private reportQuery: ReportQuery,
		private reportService: ReportService
	) {
		this.dataSource = new MatTableDataSource([] as IGroup[]);
	}

	ngOnInit() {
		const report = this.reportQuery.getSnapshot().report;
		if (report) {
			this.dataSource = new MatTableDataSource(report.groups);
			if (this.sort) {
				this.dataSource.sort = this.sort;
			}
			this.total = report.total;
		}
	}

	onBackToSearchForm() {
		this.reportService.backwardToSearchForm();
	}
}
