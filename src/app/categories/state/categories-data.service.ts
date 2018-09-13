import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { ICategory } from './category.model';
import { AuthQuery } from '../../auth/state/auth.query';

@Injectable()
export class CategoriesDataService {
	constructor(private db: AngularFirestore, private authQuery: AuthQuery) {}

	getCategories() {
		const userId = this.authQuery.getSnapshot().userId;

		return this.db
			.collection<ICategory>(`users/${userId}/categories`)
			.valueChanges()
			.pipe(take(1));
	}

	deleteCategory(id: ID) {
		const userId = this.authQuery.getSnapshot().userId;

		const categoryDoc = this.db
			.collection<ICategory>(`users/${userId}/categories`)
			.doc<ICategory>(id as string);

		return categoryDoc.delete();
	}

	addCategory(name: string) {
		const userId = this.authQuery.getSnapshot().userId;
		const newCategoryId = this.db.createId();

		const newCategoryDoc = this.db
			.collection<ICategory>(`users/${userId}/categories`)
			.doc<ICategory>(newCategoryId);

		return newCategoryDoc
			.set({
				id: newCategoryId,
				name: name
			})
			.then(() => {
				return newCategoryId;
			});
	}

	updateCategory(id: ID, name: string) {
		const userId = this.authQuery.getSnapshot().userId;

		const categoryDoc = this.db
			.collection<ICategory>(`users/${userId}/categories`)
			.doc<ICategory>(id as string);

		return categoryDoc.update({
			name
		});
	}
}
