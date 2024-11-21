import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { RolesService } from '../../../auth/services/roles.service';
import { roleEnum } from '../../roles/role.enum';
import { LocalstorageService } from '../../../auth/services/localstorage.service';
import { LanguageService } from '../../../services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchProductsService } from '../../../services/search-products.service';
import { SearchInputComponent } from "../search-input/search-input.component";
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, TranslateModule, SearchInputComponent],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss'
})
export class TopNavigationComponent implements OnInit {
  choosenLang: any;
  dir: any;
  mobileToggle: boolean = false;
  searchForm;
  userData: any;
  roleEnum = roleEnum;
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public rolesService: RolesService,
    private localStorgeService: LocalstorageService,
    private languageService: LanguageService,
    public translate: TranslateService,
    private searchProductsService: SearchProductsService,
    private productsService: ProductsService,
  ) {
    this.choosenLang = this.languageService.Lang$;
    this.dir = this.languageService.dir$;
    this.searchForm = this.fb.group({
      search: [''],
    });
    this.userData = this.authService.userLoginData;
  }
  ngOnInit(): void {
    // this.searchForm.valueChanges.subscribe((data) => {
    //   if (data.search !== null && data.search !== undefined) {
    //     this.searchProductsService.searchProducts.set(data.search);
    //   }
    // });
    this.languageService.setLanguage();
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

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    // console.log(this.searchTerm);
    this.productsService.search.next(this.searchTerm);
  }

  searchProducts(value: string) {
    // console.log('test', 'asdasd', value);
  }
}
