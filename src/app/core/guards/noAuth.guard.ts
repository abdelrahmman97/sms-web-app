import { Router, type CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = ( route, state ) => {
	const authService = inject( AuthenticationService );
	let router = inject( Router );

	if ( authService.getToken() ) {

		router.navigate( [ "/students" ] );
		return false;
	}
	else {
		return true;
	}
};
