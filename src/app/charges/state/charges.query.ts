import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ChargesStore, ChargesState } from './charges.store';
import { ICharge } from './charge.model';

@Injectable()
export class ChargesQuery extends QueryEntity<ChargesState, ICharge> {
	constructor(protected store: ChargesStore) {
		super(store);
	}
}
