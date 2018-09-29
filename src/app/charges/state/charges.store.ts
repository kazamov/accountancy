import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { ICharge } from './charge.model';

export interface ChargesState extends EntityState<ICharge> {
	ui: {
		pageSize: number;
		lastItem: ICharge | null;
		allItemsLoaded: boolean;
	};
}

const initialState = {
	ui: {
		pageSize: 4,
		lastItem: null,
		allItemsLoaded: false
	}
};

@Injectable()
@StoreConfig({ name: 'charges' })
export class ChargesStore extends EntityStore<ChargesState, ICharge> {
	constructor() {
		super(initialState);
	}

	updateLastItem(lastItem: ICharge) {
		this.updateRoot(state => {
			return {
				...state,
				ui: {
					...state.ui,
					lastItem
				}
			};
		});
	}

	updateAllItemsLoaded(allItemsLoaded: boolean) {
		this.updateRoot(state => {
			return {
				...state,
				ui: {
					...state.ui,
					allItemsLoaded
				}
			};
		});
	}
}
