import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentManagementRoutingModule } from './student-management-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule( {
	declarations: [
		StudentListComponent,
		StudentCreateComponent,
		StudentEditComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		StudentManagementRoutingModule,
		TranslateModule,
	]
} )
export class StudentManagementModule { }
