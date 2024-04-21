import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILogin } from '../../core/models/ILogin.Model';
import { IResponse } from '../../core/models/IResponse.Model';

@Component( {
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
} )
export class LoginComponent {
	loginForm: FormGroup;
	submitted = false;
	user: ILogin = {} as ILogin;

	constructor (
		private formBuilder: FormBuilder,
		private authService: AuthenticationService,
		private router: Router,
		private toaster: ToastrService
	) {
		this.loginForm = this.formBuilder.group( {
			UserName: [ '', Validators.required ],
			Password: [ '', Validators.required ]
		} );
	}

	onSubmit () {
		this.submitted = true;
		if ( this.loginForm.invalid ) {
			return;
		}

		this.user = {
			UserName: this.loginForm.get( [ 'UserName' ] )?.value,
			Password: this.loginForm.get( [ 'Password' ] )?.value,
		}

		this.authService.login( this.user ).subscribe( {
			next: ( response: IResponse ) => {
				if ( response.Success ) {
					this.authService.setToken( response.Data as string );
					this.authService.updateAuthenticationStatus( true );
					this.router.navigate( [ '/students/list' ] );
				} else {
					this.toaster.error( response.Message, "Error" );
				}
			},
			error: ( error ) => {
				console.log( error );
				this.toaster.error( error, "Error" );
			}
		} );
	}
}
