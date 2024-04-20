import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = ( route, state ) => {
	const authService = inject( AuthenticationService );
	let router = inject( Router );

	if ( authService.isAuthenticatedSubjectValue() ) {
		return true;
	}
	else {
		router.navigate( [ "/auth/login" ] );
		return false;
	}
};
