import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryNamePipe } from './category-name.pipe';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [CategoryNamePipe],
	imports: [CommonModule, MaterialModule, ReactiveFormsModule],
	exports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		CategoryNamePipe
	]
})
export class SharedModule {}
