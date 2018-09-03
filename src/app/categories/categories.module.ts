import { NgModule } from '@angular/core';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListItemComponent } from './category-list/category-list-item/category-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [SharedModule, CategoriesRoutingModule],
	declarations: [CategoryListComponent, CategoryListItemComponent]
})
export class CategoriesModule {}
