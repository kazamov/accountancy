import { Injectable } from '@angular/core';

import { ICharge } from './charge.interface';

const charges: ICharge[] = [
	{
		id: '121',
		date: new Date(),
		category: 'Продукты',
		price: 158.6,
		description: 'Apples, cheese, milk'
	},
	{
		id: '122',
		date: new Date(),
		category: 'Продукты',
		price: 188.1,
		description: 'Apples, cheese, milk'
	},
	{
		id: '123',
		date: new Date(),
		category: 'Продукты',
		price: 198.7,
		description: 'Apples, cheese, milk'
	},
	{
		id: '124',
		date: new Date(),
		category: 'Продукты',
		price: 118.98,
		description: 'Apples, cheese, milk'
	},
	{
		id: '125',
		date: new Date(),
		category: 'Продукты',
		price: 138.9,
		description: 'Apples, cheese, milk'
	},
	{
		id: '126',
		date: new Date(),
		category: 'Продукты',
		price: 148.78,
		description: 'Apples, cheese, milk'
	}
];

@Injectable()
export class ChargesService {
	getCharges() {
		return charges.slice();
	}

	getCharge(id: string) {
		return charges.find(charge => charge.id === id) || null;
	}
}
