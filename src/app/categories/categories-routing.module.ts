import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesResolver } from './state/categories.resolver';

const routes: Routes = [
	{
		path: '',
		component: CategoryListComponent,
		resolve: {
			categoriesData: CategoriesResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoriesRoutingModule {}
