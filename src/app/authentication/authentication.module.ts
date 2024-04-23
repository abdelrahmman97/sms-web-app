import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule( {
	declarations: [
		RegisterComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		ReactiveFormsModule,
		TranslateModule,
	]
} )
export class AuthenticationModule { }
