import { Component } from '@angular/core';
import { ReportService, ISearchCriteria } from '../state/report.service';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
	constructor(private reportService: ReportService) {}

	onSearchCriteriaChanged(searchCriteria: ISearchCriteria) {
		this.reportService.generateReport(searchCriteria);
	}
}
