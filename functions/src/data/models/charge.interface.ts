import { ICategory } from './category.interface';

export interface ICharge {
	id: string;
	date: Date;
	category: ICategory['id'];
	price: number;
	description?: string;
}
