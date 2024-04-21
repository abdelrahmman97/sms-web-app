import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './core/Interceptor/auth.interceptor';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HeaderComponent } from './shared/header/header.component';

export function HttpLoaderFactory ( http: HttpClient ) {
	return new TranslateHttpLoader( http );
}

@NgModule( {
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ToastrModule.forRoot(),
		TranslateModule.forRoot( {
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [ HttpClient ]
			}
		} ),
		LoadingBarHttpClientModule,
		LoadingBarRouterModule
	],
	providers: [
		provideHttpClient( withInterceptors( [ authInterceptor ] ) )
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
