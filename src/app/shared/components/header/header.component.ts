import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/auth/authentication.service';
import { IResponse } from '../../../core/models/IResponse.Model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../../core/services/language/language.service';

@Component( {
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
} )
export class HeaderComponent implements OnInit {

	title = 'Roboost - SMS';
	isAuthenticated: boolean = false;
	selectedLanguage: string = "en";
	langs: any[] = [];

	constructor (
		private authService: AuthenticationService,
		private router: Router,
		private toaster: ToastrService,
		private langService: LanguageService
	) {
		this.authService.isAuthenticated().subscribe( {
			next: ( value ) => {
				this.isAuthenticated = value;
			},
		} );
	}

	ngOnInit (): void {
		this.getSelectedLang();
	}

	onLogout () {
		this.authService.logout().subscribe( {
			next: ( response: IResponse ) => {
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

	setLanguage ( lang: string ) {
		this.langService.setCurrentLanguage( lang );
		this.getSelectedLang();
	}

	getSelectedLang () {
		this.langService.language$.subscribe( {
			next: ( value: string ) => {
				this.selectedLanguage = value
			}
		} );
	}
}
