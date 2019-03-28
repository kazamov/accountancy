import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from 'data';

import { AuthQuery } from '../../auth/state/auth.query';
import { BackendCollections } from '../../shared/backend-collections.enum';

@Injectable()
export class CategoriesDataService {
	constructor(private db: AngularFirestore, private authQuery: AuthQuery) {}

	getCategories() {
		const userData = this.authQuery.getValue().userData;

		return this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userData ? userData.uid : ''}/${
					BackendCollections.CATEGORIES
				}`,
				collectionRef => collectionRef.orderBy('name')
			)
			.valueChanges()
			.pipe(take(1));
	}

	deleteCategory(id: string) {
		const userData = this.authQuery.getValue().userData;

		const categoryDoc = this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userData ? userData.uid : ''}/${
					BackendCollections.CATEGORIES
				}`
			)
			.doc<ICategory>(id as string);

		return categoryDoc.delete();
	}

	addCategory(name: string) {
		const userData = this.authQuery.getValue().userData;
		const newCategoryId = this.db.createId();

		const newCategoryDoc = this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userData ? userData.uid : ''}/${
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
				return newCategoryId;
			});
	}

	updateCategory(id: string, name: string) {
		const userData = this.authQuery.getValue().userData;

		const categoryDoc = this.db
			.collection<ICategory>(
				`${BackendCollections.USERS}/${userData ? userData.uid : ''}/${
					BackendCollections.CATEGORIES
				}`
			)
			.doc<ICategory>(id as string);

		return categoryDoc.update({
			name
		});
	}
}
