import { ID } from '@datorama/akita';

export interface ICharge {
	id: ID;
	date: Date;
	category: string;
	price: number;
	description?: string;
}
