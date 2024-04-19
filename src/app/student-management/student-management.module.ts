import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentManagementRoutingModule } from './student-management-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentSearchComponent } from './student-search/student-search.component';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentCreateComponent,
    StudentEditComponent,
    StudentSearchComponent
  ],
  imports: [
    CommonModule,
    StudentManagementRoutingModule
  ]
})
export class StudentManagementModule { }
