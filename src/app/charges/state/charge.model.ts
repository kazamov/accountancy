import { ICharge } from 'data';

export interface IChargeData {
	date: ICharge['date'];
	category: ICharge['category'];
	price: ICharge['price'];
	description?: ICharge['description'];
}

export function createCharge(id: string, chargeData: IChargeData) {
	return {
		id,
		...chargeData
	} as ICharge;
}
