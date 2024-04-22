import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../core/services/students/Student.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse } from '../../core/models/IResponse.Model';
import { IStudentEditable } from '../../core/models/IStudentEditable.Modal';

@Component( {
	selector: 'app-student-edit',
	templateUrl: './student-edit.component.html',
	styleUrl: './student-edit.component.css'
} )
export class StudentEditComponent implements OnInit {

	studentId!: number;
	studentForm: FormGroup;
	submited: boolean = false;
	visible: boolean = false;

	constructor (
		private fb: FormBuilder,
		private activeRoute: ActivatedRoute,
		private studentService: StudentService,
		private router: Router,
		private toastr: ToastrService
	) {
		this.studentForm = this.fb.group( {
			NameArabic: [ '', [ Validators.required, Validators.pattern( /^[\u0600-\u06FF\s]+$/ ) ] ],
			NameEnglish: [ '', [ Validators.required, Validators.pattern( /^[a-zA-Z\s]+$/ ) ] ],
			ID: [ '', Validators.required ],
			FirstName: [ '', Validators.required ],
			LastName: [ '', Validators.required ],
			Mobile: [ '', [ Validators.required, Validators.pattern( /^\d{11}$/ ) ] ],
			Email: [ '', [ Validators.required, Validators.pattern( /^\d{10}$|^(\w+\.*\w*)@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ ) ] ],
			NationalID: [ '', [ Validators.required, Validators.pattern( /^\d{14}$/ ) ] ],
			Age: [ '', [ Validators.required, Validators.min( 18 ), Validators.pattern( /^\d{2}$/ ) ] ]
		} );
	}

	ngOnInit (): void {
		this.studentId = Number( this.activeRoute.snapshot.paramMap.get( "id" ) );
		console.log( this.studentId );
		if ( isNaN( this.studentId ) ) {
			this.toastr.error( "Student ID is not valid", "Error" );
			this.router.navigate( [ "/students/list" ] );
		} else {
			this.getStudentData();
		}
	}

	getStudentData () {
		this.studentService.getEditableByID( this.studentId ).subscribe( {
			next: ( response: IResponse ) => {
				if ( response.Success ) {
					this.studentForm.patchValue( response.Data );
					this.visible = true;
				} else {
					console.log( response );
					this.toastr.error( response.Message, "Error" );
				}
			},
			error: ( error ) => {
				console.log( error );
				this.toastr.error( error.Message, "Error" );
			}
		} );
	}

	onSubmit (): void {

		this.submited = true;

		if ( this.studentForm.invalid ) {
			this.submited = false;
			this.toastr.error( "Some fields are required" )
			return;
		}
		console.log( this.studentForm.value );

		this.studentService.updateStudent( this.studentForm.value ).subscribe( {
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
