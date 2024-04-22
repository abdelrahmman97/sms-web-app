import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../core/models/IStudent.Model';
import { StudentService } from '../../core/services/students/Student.service';
import { IResponse } from '../../core/models/IResponse.Model';
import { ToastrService } from 'ngx-toastr';

@Component( {
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrl: './student-list.component.css'
} )
export class StudentListComponent implements OnInit {

	students: IStudent[] = [];
	filteredStudents: IStudent[] = [];
	searchText: string = '';
	ShowDeleteModal: boolean = false;
	studentId: number = 0;
	activeTab: number = 1;

	constructor ( private _studentService: StudentService, private _toastr: ToastrService ) { }

	ngOnInit (): void {
		this.getStudentList( this.activeTab );
	}

	setActiveTab ( tab: number ) {
		this.activeTab = tab;
		this.getStudentList( this.activeTab );
	}

	private getStudentList ( tab: number ) {
		if ( tab == 1 ) {
			this._studentService.getStudents().subscribe( {
				next: ( response: IResponse ) => {
					console.log( response );
					if ( response.Success ) {
						this.students = response.Data;
						this.filteredStudents = response.Data;
					} else {
						console.log( response );
						this._toastr.error( response.Message, "Error" );
					}
				}
			} );
		} else {
			this._studentService.getStudentsICreated().subscribe( {
				next: ( response: IResponse ) => {
					console.log( response );
					if ( response.Success ) {
						this.students = response.Data;
						this.filteredStudents = response.Data;
					} else {
						console.log( response );
						this._toastr.error( response.Message, "Error" );
					}
				}
			} );
		}
	}

	onDelete ( id: number ) {
		this.studentId = id;
		this.ShowDeleteModal = true;
	}

	onConfirmDelete () {
		this._studentService.deleteStudent( this.studentId ).subscribe( {
			next: ( response: IResponse ) => {
				console.log( response );
				if ( response.Success ) {
					this.ShowDeleteModal = false;
					this._toastr.success( "Student has been deleted" );
					this.getStudentList( this.activeTab );
				} else {
					this.ShowDeleteModal = false;
					console.log( response );
					this._toastr.error( response.Message, "Error" );
				}
			}
		} );
	}

	searchStudents (): void {
		if ( !this.searchText.trim() ) {
			this.filteredStudents = this.students;
			return;
		}
		console.log( this.filteredStudents );
		console.log( this.searchText );
		this.filteredStudents = this.students.filter(
			student =>
				student.Name.toLowerCase().includes( this.searchText.toLowerCase() ) ||
				student.Mobile.toLowerCase().includes( this.searchText.toLowerCase() ) ||
				student.NationalID.toLowerCase().includes( this.searchText.toLowerCase() ) ||
				student.Age.toString().includes( this.searchText.toLowerCase() )
		);
		console.log( this.filteredStudents );
	}
}
