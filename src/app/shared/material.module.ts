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
	MatDividerModule,
	MatDialogModule,
	MatTableModule
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
		MatDividerModule,
		MatDialogModule,
		MatTableModule
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
		MatDividerModule,
		MatDialogModule,
		MatTableModule
	]
})
export class MaterialModule {}
