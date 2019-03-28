import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material.module';

@NgModule({
	declarations: [AppComponent],
	imports: [CoreModule, AuthModule, MaterialModule, AppRoutingModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
