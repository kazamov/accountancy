import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { HAMMERJS_PROVIDER } from './hammerjs.provider';
import { UiService } from './ui.service';
import { CategoriesQuery } from '../categories/state/categories.query';
import { CategoriesStore } from '../categories/state/categories.store';
import { CategoriesService } from '../categories/state/categories.service';
import { CategoriesDataService } from '../categories/state/categories-data.service';
import { CategoriesResolver } from '../categories/state/categories.resolver';
import { AuthStore } from '../auth/state/auth.store';
import { AuthQuery } from '../auth/state/auth.query';
import { AuthGuard } from '../auth/guards/auth.guard';
import { environment } from 'src/environments/environment';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		}),
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		AngularFireModule.initializeApp(environment.firebaseConfig)
	],
	exports: [
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule,
		AngularFireModule
	],
	providers: [
		HAMMERJS_PROVIDER,
		UiService,
		CategoriesQuery,
		CategoriesStore,
		CategoriesService,
		CategoriesDataService,
		CategoriesResolver,
		AuthStore,
		AuthQuery,
		AuthGuard,
		AngularFirestore
	]
})
export class CoreModule {}
