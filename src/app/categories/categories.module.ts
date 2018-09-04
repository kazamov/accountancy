import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListItemComponent } from './category-list/category-list-item/category-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDialogComponent } from './category-list/category-dialog/category-dialog.component';

@NgModule({
	imports: [SharedModule, CategoriesRoutingModule, ReactiveFormsModule],
	declarations: [
		CategoryListComponent,
		CategoryListItemComponent,
		CategoryDialogComponent
	],
	entryComponents: [CategoryDialogComponent]
})
export class CategoriesModule {}
