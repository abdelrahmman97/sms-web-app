import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

export const authInterceptor: HttpInterceptorFn = ( req, next ) => {
	const authService = inject( AuthenticationService );

	let token = authService.getToken() || "";
	let lang = localStorage.getItem( "lang" ) || "en";

	if ( token ) {
		req = req.clone( {
			setHeaders: {
				token: `${ token }`,
				lang: lang
			}
		} )
	}

	return next( req );
};
