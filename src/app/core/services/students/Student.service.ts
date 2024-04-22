import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../models/IResponse.Model';
import { IStudentCreate } from '../../models/IStudentCreate.Model';
import { IStudentEditable } from '../../models/IStudentEditable.Modal';

@Injectable( {
	providedIn: 'root'
} )
export class StudentService {

	private readonly API: string = environment.baseUrl;

	constructor ( private http: HttpClient ) { }

	getStudents (): Observable<IResponse> {
		return this.http.get<IResponse>( `${ this.API }/Student/Get` );
	}

	getStudentsICreated () {
		return this.http.get<IResponse>( `${ this.API }/Student/GetAuthorized` );
	}

	getStudentsById ( id: number ): Observable<IResponse> {
		return this.http.get<IResponse>( `${ this.API }/Student/GetByID/${ id }` );
	}

	getEditableByID ( id: number ): Observable<IResponse> {
		return this.http.get<IResponse>( `${ this.API }/Student/GetEditableByID?id=${ id }` );
	}

	createStudent ( student: IStudentCreate ): Observable<IResponse> {
		return this.http.post<IResponse>( `${ this.API }/Student/POST`, student );
	}

	updateStudent ( student: IStudentEditable ): Observable<IResponse> {
		return this.http.put<IResponse>( `${ this.API }/Student/PUT`, student );
	}

	deleteStudent ( id: number ): Observable<IResponse> {
		return this.http.delete<IResponse>( `${ this.API }/Student/Delete?id=${ id }` );
	}
}
