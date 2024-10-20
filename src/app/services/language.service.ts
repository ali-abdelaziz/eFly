import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { LocalstorageService } from '../auth/services/localstorage.service';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  platformId: object;
  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    // private cookieService: CookieService,
    @Inject(PLATFORM_ID) platformId: Object,
    private localStorgeService: LocalstorageService
  ) {
    if (this.authService.userLoginData()) this.setLanguage();
    this.platformId = platformId;
  }
  dir$ = new BehaviorSubject<'rtl' | 'ltr'>('ltr');
  Lang$ = new BehaviorSubject<'en' | 'ar'>('en');
  dirListener$ = this.dir$.asObservable();

  setLanguage() {
    if (isPlatformBrowser(this.platformId)) {
      let prefered_language = this.authService.userLoginData()?.user
        ?.prefered_language
        ? this.authService.userLoginData()?.user?.prefered_language
        : JSON.parse(this.localStorgeService.getItem('lang')!)
        ? JSON.parse(this.localStorgeService.getItem('lang')!).choosenLanguage
        : 'ar';

      this.Lang$.next(prefered_language ?? 'ar');
      this.translate.setDefaultLang(this.Lang$.getValue());
      this.translate.use(this.Lang$.getValue());
      this.dir$.next(this.Lang$.getValue() == 'ar' ? 'rtl' : 'ltr');
      this.dir$.next(this.dir$.getValue());
      document.getElementsByTagName('body')[0].dir = this.dir$.getValue();

      this.localStorgeService.setItem(
        'lang',
        JSON.stringify({
          choosenLanguage: this.Lang$.getValue(),
          dir: this.dir$.getValue(),
        })
      );
    }
  }

  changeLanguage(lang: any) {
    let prefered_language = lang;
    this.Lang$.next(prefered_language ?? 'ar');
    this.translate.setDefaultLang(this.Lang$.getValue());
    this.translate.use(this.Lang$.getValue());
    this.dir$.next(this.Lang$.getValue() == 'ar' ? 'rtl' : 'ltr');
    this.dir$.next(this.dir$.getValue());
    document.getElementsByTagName('body')[0].dir = this.dir$.getValue();

    this.localStorgeService.setItem(
      'lang',
      JSON.stringify({
        choosenLanguage: this.Lang$.getValue(),
        dir: this.dir$.getValue(),
      })
    );
  }
}
