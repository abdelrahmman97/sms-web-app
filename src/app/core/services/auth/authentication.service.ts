import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable( {
	providedIn: 'root'
} )
export class AuthenticationService {

	private readonly API: string = environment.baseUrl;
	private isAuthenticatedSubject = new BehaviorSubject<boolean>( false );

	constructor ( private http: HttpClient, private cookieService: CookieService ) { }

	getToken (): string | null {
		return this.cookieService.get( 'token' );
	}

	setToken ( token: string ): void {
		this.cookieService.set( "token", token );
	}

	isAuthenticated (): Observable<boolean> {
		// return !!this.getToken();
		return this.isAuthenticatedSubject.asObservable();
	}

	isAuthenticatedSubjectValue () {
		return this.isAuthenticatedSubject.getValue();
	}

	updateAuthenticationStatus ( isAuthenticated: boolean ) {
		this.isAuthenticatedSubject.next( isAuthenticated );
	}

	login ( username: string, password: string ) {
		return this.http.post<any>( `${ this.API }/User/Login`, { username, password } )
	}

	register ( user: any ): Observable<any> {
		return this.http.post( '/User/POST', user );
	}

	logout (): Observable<any> {
		return this.http.post<any>( `${ this.API }/User/Logout`, null );
	}


}
