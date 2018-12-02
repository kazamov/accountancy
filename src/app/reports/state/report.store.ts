import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IReport } from 'data';

export interface ISearchCriteria {
	startDate: null | number;
	endDate: null | number;
}
export interface ReportState {
	criteria: ISearchCriteria;
	report: IReport;
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
