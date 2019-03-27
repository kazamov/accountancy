import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HAMMERJS_PROVIDER } from './hammerjs.provider';
import { UiService } from './ui.service';
import { CategoriesQuery } from './categories/state/categories.query';
import { CategoriesStore } from './categories/state/categories.store';
import { CategoriesService } from './categories/state/categories.service';
import { CategoriesDataService } from './categories/state/categories-data.service';
import { CategoriesResolver } from './categories/state/categories.resolver';
import { AuthStore } from './auth2/state/auth.store';
import { AuthQuery } from './auth2/state/auth.query';
import { AuthGuard } from './auth2/state/auth.guard';
import { LoginGuard } from './auth2/state/login.guard';
import { NgxAuthFirebaseUIModule } from './auth2/auth2.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		}),
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		AngularFireModule.initializeApp(environment.firebaseConfig),
		NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
		AngularFireAuthModule,
		MaterialModule,
		// AuthModule,
		AppRoutingModule
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
		AngularFireAuth,
		AuthGuard,
		LoginGuard,
		AngularFirestore
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
