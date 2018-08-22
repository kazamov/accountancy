import { NgModule } from '@angular/core';

import {
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatListModule,
	MatCardModule
} from '@angular/material';

@NgModule({
	imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatCardModule],
	exports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatCardModule]
})
export class MaterialModule {}
