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
	MatDividerModule,
	MatDialogModule,
	MatTableModule,
	MatProgressBarModule,
	MatSortModule
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
		MatDividerModule,
		MatDialogModule,
		MatTableModule,
		MatProgressBarModule,
		MatSortModule
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
		MatDividerModule,
		MatDialogModule,
		MatTableModule,
		MatProgressBarModule,
		MatSortModule
	]
})
export class MaterialModule {}
