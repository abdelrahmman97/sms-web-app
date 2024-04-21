import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/auth/authentication.service';
import { IResponse } from '../../core/models/IResponse.Model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component( {
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
} )
export class HeaderComponent {
	title = 'Roboost - SMS';
	isAuthenticated: boolean = false;

	constructor (
		private authService: AuthenticationService,
		private router: Router,
		private toaster: ToastrService
	) {

		this.authService.isAuthenticated().subscribe( {
			next: ( value ) => {
				console.log(value);
				this.isAuthenticated = value;
			},
		} );
	}

	onLogout () {
		this.authService.logout().subscribe( {
			next: ( response: any ) => {
				if ( response.Success ) {
					this.authService.removeToken();
					this.authService.updateAuthenticationStatus( false );
					this.toaster.success( response.Message );
					this.router.navigate( [ '/auth/login' ] );
				} else {
					this.toaster.error( response as any, "Error" );
				}
			},
			error: ( response ) => {
				console.log( response );
				this.toaster.error( response?.error.message, "Error" );
			}
		} )
	}
}
