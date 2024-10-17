import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.api + 'auth/login';

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    return this.http.post<Login>(this.apiUrl, { username, password });
  }

}
