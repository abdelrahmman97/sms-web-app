import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRegister } from '../../core/models/IRegister.Model';
import { IResponse } from '../../core/models/IResponse.Model';

@Component( {
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
} )
export class RegisterComponent {

	registerForm: FormGroup;
	submitted = false;
	user: IRegister = {} as IRegister;

	constructor (
		private formBuilder: FormBuilder,
		private authService: AuthenticationService,
		private router: Router,
		private toaster: ToastrService
	) {
		this.registerForm = this.formBuilder.group( {
			Name: [ '', Validators.required ],
			UserName: [ '', [ Validators.required, Validators.minLength( 8 ), Validators.pattern( /^[a-zA-Z0-9]{8,}$/ ) ] ],
			Password: [ '', [ Validators.required, Validators.minLength( 8 ), Validators.pattern( /^[a-zA-Z0-9._@]{8,}$/ ) ] ]
		} );
	}

	onSubmit () {
		this.submitted = true;

		if ( this.registerForm.invalid ) {
			return;
		}

		this.user = {
			Name: this.registerForm.get( [ 'Name' ] )?.value,
			UserName: this.registerForm.get( [ 'UserName' ] )?.value,
			Password: this.registerForm.get( [ 'Password' ] )?.value
		}

		this.authService.register( this.user ).subscribe( {
			next: ( response: IResponse ) => {
				if ( response.Success ) {
					this.router.navigate( [ '/students/list' ] );
				}
				else {
					this.toaster.error( response.Message, "Error" )
				}
			},
			error: ( error ) => {
				console.log( error );
				this.toaster.error( error, "Error" );
			}
		} );
	}

}
