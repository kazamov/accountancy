import { ID } from '@datorama/akita';

import { ICategory } from '../../categories/state/category.model';

export interface ICharge {
	id: ID;
	date: Date;
	category: ICategory['id'];
	price: number;
	description?: string;
}

export interface IChargeData {
	date: Date;
	category: ICategory['id'];
	price: number;
	description?: string;
}

export function createCharge(id: ID, chargeData: IChargeData) {
	return {
		id,
		...chargeData
	} as ICharge;
}
