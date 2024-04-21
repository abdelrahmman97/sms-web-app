import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/Auth.guard';
import { noAuthGuard } from './core/guards/noAuth.guard';

const routes: Routes = [
	{
		path: "students",
		canActivate: [ authGuard ],
		loadChildren: () => import( "./student-management/student-management.module" ).then( m => m.StudentManagementModule )
	},
	{
		path: "auth",
		canActivate: [ noAuthGuard ],
		loadChildren: () => import( "./authentication/authentication.module" ).then( m => m.AuthenticationModule )
	},
	{
		path: '',
		redirectTo: 'students',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'students'
	}
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule { }
