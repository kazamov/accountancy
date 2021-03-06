import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ISearchCriteria, IPreparedReport } from 'data';

export interface ReportState {
	criteria: ISearchCriteria;
	report: IPreparedReport;
}

export function createInitialState(): ReportState {
	return {
		criteria: {
			startDate: null,
			endDate: null
		},
		report: {
			groups: [],
			total: 0
		}
	};
}

@Injectable()
@StoreConfig({ name: 'report' })
export class ReportStore extends Store<ReportState> {
	constructor() {
		super(createInitialState());
	}
}
