import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ICategory } from '../../categories/state/category.model';

export interface IGroup {
	categoryId: ICategory['id'];
	total: number;
}

export interface IReport {
	groups: IGroup[];
	total: number;
}
export interface ReportState {
	report: IReport;
}

export function createInitialState(): ReportState {
	return {
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
