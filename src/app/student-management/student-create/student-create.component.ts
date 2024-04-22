import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../core/services/students/Student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../../core/models/IResponse.Model';

@Component( {
	selector: 'app-student-create',
	templateUrl: './student-create.component.html',
	styleUrl: './student-create.component.css'
} )
export class StudentCreateComponent {

	studentForm: FormGroup;
	submited: boolean = false;

	constructor (
		private fb: FormBuilder,
		private studentService: StudentService,
		private router: Router,
		private toastr: ToastrService
	) {
		this.studentForm = this.fb.group( {
			FirstName: [ '', Validators.required ],
			LastName: [ '', Validators.required ],
			Mobile: [ '', [ Validators.required, Validators.pattern( /^\d{11}$/ ) ] ],
			Email: [ '', [ Validators.required, Validators.pattern( /^\d{10}$|^(\w+\.*\w*)@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ ) ] ],
			NationalID: [ '', [ Validators.required, Validators.pattern( /^\d{14}$/ ) ] ],
			Age: [ '', [ Validators.required, Validators.min( 18 ), Validators.pattern( /^\d{2}$/ ) ] ]
		} );
	}

	onSubmit (): void {

		this.submited = true;

		if ( this.studentForm.invalid ) {
			this.submited = false;
			return;
		}

		this.studentService.createStudent( this.studentForm.value ).subscribe( {
			next: ( response: IResponse ) => {
				console.log( response );
				if ( response.Success ) {
					this.toastr.success( response.Message );
					this.router.navigate( [ '/students/list' ] );
				}
				else {
					this.toastr.error( response.Message );
				}
			},
			error: ( error ) => {
				console.log( error );
				this.submited = false;
				this.toastr.error( error );
			}
		} );
	}
}
