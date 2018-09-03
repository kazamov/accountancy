import { NgModule } from '@angular/core';

import {
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatListModule,
	MatCardModule,
	MatInputModule,
	MatFormFieldModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSelectModule,
	MatProgressSpinnerModule,
	MatDividerModule
} from '@angular/material';

@NgModule({
	imports: [
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		MatDividerModule
	],
	exports: [
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		MatDividerModule
	]
})
export class MaterialModule {}
