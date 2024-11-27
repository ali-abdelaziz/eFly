import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { tap } from 'rxjs';
import { User } from '../models/user.model';

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
  userLoginDataEffect = effect(() => { });
  token = signal<string>('');


  login(username: string, password: string) {
    return this.http.post<Login>(this.apiUrl, { username, password })
    .pipe(
      tap((res: any) => {
        this.isLogin.set(true);
        this.userLoginData.set(res);
        this.token.set(res.token);
        this.saveLoginResponseToLocalStorage(res);
      })
    )
  }

  logout() {
    this.isLogin.set(false);
    this.userLoginData.set(null);
    this.clearUserFromLocalStorage();
    this.clearTokenFromLocalStorage();
    this.router.navigateByUrl('/')
  }

  saveLoginResponseToLocalStorage(user: Login) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }

  clearUserFromLocalStorage() {
    return this.localStorgeService.removeItem('user');
  }

  clearTokenFromLocalStorage() {
    return this.localStorgeService.removeItem('token');
  }

}
