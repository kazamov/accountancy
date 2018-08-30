import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { ICharge } from './charge.model';

const charges: ICharge[] = [
	{
		id: '121',
		date: new Date(),
		category: 'Продукты',
		price: 158.6,
		description: 'Blabla'
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
export class ChargesDataService {
	getCharges() {
		return timer(1000).pipe(mapTo(charges));
	}

	getCharge(id: ID) {
		const foundCharge = charges.find(charge => charge.id === id) || null;

		return timer(1000).pipe(mapTo(foundCharge ? { ...foundCharge } : null));
	}
}
