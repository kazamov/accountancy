import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ReportState, ReportStore } from './report.store';

@Injectable()
export class ReportQuery extends Query<ReportState> {
	constructor(protected store: ReportStore) {
		super(store);
	}
}
