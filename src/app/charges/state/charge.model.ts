import { ICharge } from 'data';

export function createCharge(id: string, chargeData: Partial<ICharge>) {
	return {
		id,
		...chargeData
	} as ICharge;
}
