import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Languages } from '../../models/Language.enum';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from '../general/Cookie.service';

@Injectable( {
	providedIn: 'root'
} )
export class LanguageService {

	private readonly languageKey: string = "lang";
	private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>( Languages.English );
	language$: Observable<string> = this.languageSubject.asObservable();

	constructor (
		private translate: TranslateService,
		private coockie: CookieService
	) {
		const savedLanguage = coockie.get( this.languageKey ) || Languages.English;
		translate.setDefaultLang( savedLanguage );
		this.setCurrentLanguage( savedLanguage );
	}

	setCurrentLanguage ( lang: string ) {
		this.translate.use( lang );
		this.coockie.set( this.languageKey, lang );
		this.languageSubject.next( lang );
		document.documentElement.dir = lang === Languages.English ? "ltr" : "rtl";
		document.documentElement.lang = lang === Languages.English ? "en" : "ar";
	}

}
