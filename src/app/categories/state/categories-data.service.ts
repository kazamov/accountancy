import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { ICategory } from './category.model';
import { AuthQuery } from '../../auth/state/auth.query';
import { BackendCollections } from '../../shared/backend-collections.enum';

@Injectable()
export class CategoriesDataService {
	constructor(private db: AngularFirestore, private authQuery: AuthQuery) {}

	getCategories() {
		const userId = this.authQuery.getSnapshot().userId;

		return this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CATEGORIES
				}`,
				collectionRef => collectionRef.orderBy('name')
			)
			.valueChanges()
			.pipe(take(1));
	}

	deleteCategory(id: ID) {
		const userId = this.authQuery.getSnapshot().userId;

		const categoryDoc = this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CATEGORIES
				}`
			)
			.doc<ICategory>(id as string);

		return categoryDoc.delete();
	}

	addCategory(name: string) {
		const userId = this.authQuery.getSnapshot().userId;
		const newCategoryId = this.db.createId();

		const newCategoryDoc = this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CATEGORIES
				}`
			)
			.doc<ICategory>(newCategoryId);

		return newCategoryDoc
			.set({
				id: newCategoryId,
				name: name
			})
			.then(() => {
				return newCategoryId as ID;
			});
	}

	updateCategory(id: ID, name: string) {
		const userId = this.authQuery.getSnapshot().userId;

		const categoryDoc = this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userId}/${
					BackendCollections.CATEGORIES
				}`
			)
			.doc<ICategory>(id as string);

		return categoryDoc.update({
			name
		});
	}
}
