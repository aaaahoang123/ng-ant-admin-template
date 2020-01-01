import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from './login/login.form';
import {API_URL} from '../../app.properties';
import {Rest} from '../../models/rest.model';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(formData: LoginForm) {
    return this.http.post<Rest<User>>(`${API_URL}login`, formData);
  }

  userData() {
    return this.http.get<Rest<User>>(`${API_URL}user`);
  }
}
