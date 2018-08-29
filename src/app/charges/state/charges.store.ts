import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { ICharge } from './charge.model';

export interface ChargesState extends EntityState<ICharge> {}

@Injectable()
@StoreConfig({ name: 'charges' })
export class ChargesStore extends EntityStore<ChargesState, ICharge> {
	constructor() {
		super();
	}
}
