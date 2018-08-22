import { Injectable } from '@angular/core';

import { ICharge } from './charge.interface';

const charges: ICharge[] = [
	{ id: '121', date: '22.08.2018', category: 'Foods', price: 158.6, description: 'Apples, cheese, milk' },
	{ id: '122', date: '22.08.2018', category: 'Foods', price: 188.1, description: 'Apples, cheese, milk' },
	{ id: '123', date: '22.08.2018', category: 'Foods', price: 198.7, description: 'Apples, cheese, milk' },
	{ id: '124', date: '22.08.2018', category: 'Foods', price: 118.98, description: 'Apples, cheese, milk' },
	{ id: '125', date: '22.08.2018', category: 'Foods', price: 138.9, description: 'Apples, cheese, milk' },
	{ id: '126', date: '22.08.2018', category: 'Foods', price: 148.78, description: 'Apples, cheese, milk' }
];

@Injectable()
export class ChargesService {
	getCharges() {
		return charges.slice();
	}
}
