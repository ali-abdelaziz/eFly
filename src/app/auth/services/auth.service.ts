import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.api + 'auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorgeService: LocalstorageService
  ) { }

  isLogin = signal<boolean>(false);
  userLoginData = signal<Login | any>(null);


  login(username: string, password: string) {
    return this.http.post<Login>(this.apiUrl, { username, password });
  }

  logout() {
    this.isLogin.set(false);
    // this.cookieService.set('isLogin', JSON.stringify(false));
    this.userLoginData.set(null);
    this.router.navigate(['/']);
    this.clearUserFromLocalStorage();
    this.clearTokenExpirationFromLocalStorage();
    this.clearTokenFromLocalStorage();
    this.router.navigateByUrl('/')
  }

  clearUserFromLocalStorage() {
    return this.localStorgeService.removeItem('user');
  }

  clearTokenExpirationFromLocalStorage() {
    return this.localStorgeService.removeItem('tokenexpire');
  }

  clearTokenFromLocalStorage() {
    return this.localStorgeService.removeItem('token');
  }

}
