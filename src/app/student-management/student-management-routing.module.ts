import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

const routes: Routes = [
	{
		path: "list",
		component: StudentListComponent
	},
	{
		path: "create",
		component: StudentCreateComponent
	},
	{
		path: "edit/:id",
		component: StudentEditComponent
	},
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full'
	}
];

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )
export class StudentManagementRoutingModule { }
