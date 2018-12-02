import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ICharge } from 'data';

import { ChargesStore, ChargesState } from './charges.store';

@Injectable()
export class ChargesQuery extends QueryEntity<ChargesState, ICharge> {
	allChargesLoaded$ = this.select(state => state.ui.allItemsLoaded);

	constructor(protected store: ChargesStore) {
		super(store);
	}
}
