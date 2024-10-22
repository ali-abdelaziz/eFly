import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalstorageService } from '../../../auth/services/localstorage.service';
import { LanguageService } from '../../../services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  choosenLang: any;
  dir: any;

  constructor(
    private sidebarService: SidebarService,
    public authService: AuthService,
    private localStorgeService: LocalstorageService,
    private languageService: LanguageService,
    public translate: TranslateService,
  ) {
    this.choosenLang = this.languageService.Lang$;
    this.dir = this.languageService.dir$;
    // this.userData = this.authService.userLoginData;
  }

  ngOnInit(): void {
    this.languageService.setLanguage();
  }

  toggleSidebar() {
  // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }

  changeLanguage() {
    if (this.authService.isLogin()) {
      this.localStorgeService.setItem(
        'user',
        JSON.stringify({
          ...this.authService.userLoginData().user,
          prefered_language: this.choosenLang.getValue() == 'ar' ? 'en' : 'ar',
        })
      );

      this.authService.userLoginData.set({
        ...this.authService.userLoginData(),
        user: {
          ...this.authService.userLoginData()?.user,
          prefered_language: this.choosenLang.getValue() == 'ar' ? 'en' : 'ar',
        },
      });
      this.languageService.setLanguage();
    } else {
      this.choosenLang.next(this.choosenLang.getValue() == 'ar' ? 'en' : 'ar');
      this.translate.setDefaultLang(this.choosenLang.getValue());
      this.translate.use(this.choosenLang.getValue());
      this.dir.next(this.choosenLang.getValue() == 'ar' ? 'rtl' : 'ltr');
      this.languageService.dir$.next(this.dir.getValue());
      document.getElementsByTagName('body')[0].dir = this.dir.getValue();
      this.localStorgeService.setItem(
        'lang',
        JSON.stringify({
          choosenLanguage: this.choosenLang.getValue(),
          dir: this.dir.getValue(),
        })
      );
    }
  }

}
