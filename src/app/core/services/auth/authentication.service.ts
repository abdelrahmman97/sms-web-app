import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRegister } from '../../models/IRegister.Model';
import { ILogin } from '../../models/ILogin.Model';
import { CookieService } from '../general/Cookie.service';

@Injectable( {
	providedIn: 'root'
} )
export class AuthenticationService {

	private readonly API: string = environment.baseUrl;
	private isAuthenticatedSubject: BehaviorSubject<boolean>;

	constructor ( private http: HttpClient, private cookieService: CookieService ) {
		this.isAuthenticatedSubject = new BehaviorSubject( !!this.getToken() );
	}

	getToken (): string | null {
		return this.cookieService.get( 'token' );
	}

	setToken ( token: string ): void {
		this.cookieService.set( "token", token );
	}

	removeToken (): void {
		this.cookieService.remove( "token" );
	}

	isAuthenticated (): Observable<boolean> {
		return this.isAuthenticatedSubject.asObservable();
	}

	getAuthenticatedSubjectValue () {
		return this.isAuthenticatedSubject.getValue();
	}

	updateAuthenticationStatus ( isAuthenticated: boolean ) {
		this.isAuthenticatedSubject.next( isAuthenticated );
	}

	login ( user: ILogin ) {
		return this.http.post<any>( `${ this.API }/User/Login`, user )
	}

	register ( user: IRegister ): Observable<any> {
		return this.http.post( `${ this.API }/User/POST`, user );
	}

	logout (): Observable<any> {
		return this.http.post<any>( `${ this.API }/User/Logout`, null );
	}


}
