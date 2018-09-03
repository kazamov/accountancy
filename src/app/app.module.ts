import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { ChargesModule } from './charges/charges.module';
import { HAMMERJS_PROVIDER } from './hammerjs.provider';
import { UiService } from './ui.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesQuery } from './categories/state/categories.query';
import { CategoriesStore } from './categories/state/categories.store';
import { CategoriesService } from './categories/state/categories.service';
import { CategoriesDataService } from './categories/state/categories-data.service';
import { CategoriesResolver } from './categories/state/categories.resolver';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		}),
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		MaterialModule,
		ChargesModule,
		CategoriesModule,
		AppRoutingModule
	],
	providers: [
		HAMMERJS_PROVIDER,
		UiService,
		CategoriesQuery,
		CategoriesStore,
		CategoriesService,
		CategoriesDataService,
		CategoriesResolver
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
