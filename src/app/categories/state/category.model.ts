import { ICategory } from 'data';

export function createCategory(id: string, name: string): ICategory {
	return {
		id,
		name
	};
}
