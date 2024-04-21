import { Injectable } from '@angular/core';

@Injectable( {
	providedIn: 'root'
} )
export class CookieService {

	constructor () { }

	set ( name: string, value: string, days?: number ) {
		const date = new Date();
		if ( days == null ) {
			date.setFullYear( date.getFullYear() + 1 );
		}
		else {
			date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 100 ) )
		}
		const expires = "expires=" + date.toUTCString();
		document.cookie = `${ name }=${ value };${ expires };path=/`;
	}

	get ( name: string ): string | null {
		const cookieValue = document.cookie
			.split( ";" )
			.find( ( row ) => row.trim().startsWith( name + "=" ) );
		return cookieValue ? decodeURIComponent( cookieValue.split( "=" )[ 1 ] ) : null;
	}

	remove ( name: string ): void {
		document.cookie = `${ name }=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;


	}
}
