import { ID } from '@datorama/akita';

export interface ICategory {
	id: ID;
	name: string;
}

export function createCategory(id: ID, name: string): ICategory {
	return {
		id,
		name
	};
}
