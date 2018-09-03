import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryNamePipe } from './category-name.pipe';
import { MaterialModule } from './material.module';

@NgModule({
	declarations: [CategoryNamePipe],
	imports: [CommonModule, MaterialModule],
	exports: [CommonModule, MaterialModule, CategoryNamePipe]
})
export class SharedModule {}
