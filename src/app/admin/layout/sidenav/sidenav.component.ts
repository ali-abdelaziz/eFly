import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalstorageService } from '../../../auth/services/localstorage.service';
import { LanguageService } from '../../../services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],

})
export class SidebnavComponent implements OnInit {
  choosenLang: any;
  dir: any;
  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;

  constructor(private sidebarService: SidebarService,
    public authService: AuthService,
    private localStorgeService: LocalstorageService,
    private languageService: LanguageService,
    public translate: TranslateService,
  ) {
    this.choosenLang = this.languageService.Lang$;
    this.dir = this.languageService.dir$;
  }

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      // console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
    this.languageService.setLanguage();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }


  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }


  selectDashboard() {
    this.isDashboardSelected = true;
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
