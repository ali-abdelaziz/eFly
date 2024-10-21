import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Service to use ngx-toastr with custome style
 */
export class SnackBarService {
  constructor(
    private ToastrService: ToastrService,
    private languageService: LanguageService,
    private TranslateService: TranslateService
  ) {}

  simpleSnackBar(
    text: string,
    title: string = '',
    closeButton: boolean = false
  ) {
    this.ToastrService.success(this.TranslateService.instant(text), title, {
      timeOut: 10000,
      closeButton: closeButton,
      positionClass:
        this.languageService.dir$.getValue() == 'ltr'
          ? 'toast-top-right'
          : 'toast-top-left',
    });
  }
  errorSnackBar(
    text: string,
    title: string = '',
    closeButton: boolean = false
  ) {
    this.ToastrService.error(
      this.TranslateService.instant(text),
      this.TranslateService.instant(title),
      {
        timeOut: 10000,
        closeButton: closeButton,
        positionClass:
          this.languageService.dir$.getValue() == 'ltr'
            ? 'toast-top-right'
            : 'toast-top-left',
      }
    );
  }
  backEndErrorSnackBar(
    text: any,
    title: string = '',
    closeButton: boolean = false
  ) {
    // let msg = this.languageService.dir$.getValue() == 'rtl' ? text.ar : text.en
    this.ToastrService.error(text, title, {
      timeOut: 5000,
      closeButton: closeButton,
      positionClass:
        this.languageService.dir$.getValue() == 'ltr'
          ? 'toast-top-right'
          : 'toast-top-left',
    });
  }
  warningSnackBar(
    text: string,
    title: string = '',
    closeButton: boolean = false
  ) {
    this.ToastrService.warning(this.TranslateService.instant(text), title, {
      timeOut: 10000,
      closeButton: closeButton,
      positionClass:
        this.languageService.dir$.getValue() == 'ltr'
          ? 'toast-bottom-right'
          : 'toast-bottom-left',
    });
  }

  notificationSnackbar(
    text: string,
    title: string = '',
    closeButton: boolean = false
  ) {
    this.ToastrService.success(this.TranslateService.instant(text), title, {
      timeOut: 500000000,
      closeButton: closeButton,
      positionClass:
        this.languageService.dir$.getValue() == 'ltr'
          ? 'toast-top-right'
          : 'toast-top-left',
    });
  }

  infoSnackBar(text: string, title: string = '', closeButton: boolean = false) {
    this.ToastrService.info(this.TranslateService.instant(text), title, {
      timeOut: 10000,
      closeButton: closeButton,
      positionClass:
        this.languageService.dir$.getValue() == 'ltr'
          ? 'toast-top-right'
          : 'toast-top-left',
    });
  }
}
