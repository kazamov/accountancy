import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ChargesModule } from './charges/charges.module';
import { HAMMERJS_PROVIDER } from './hammerjs.provider';
import { UiService } from './ui.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		}),
		MaterialModule,
		ChargesModule,
		AppRoutingModule
	],
	providers: [HAMMERJS_PROVIDER, UiService],
	bootstrap: [AppComponent]
})
export class AppModule {}
