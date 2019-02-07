import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { LoginData } from './login-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  loginUser: LoginData = {
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({'NoAuth': 'True'}) };

  constructor(private http: HttpClient) { console.log('service is imported and ready to go!'); }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUserUrl, user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(`${environment.apiBaseUrl}/auth`, authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(`${environment.apiBaseUrl}/userProfile`);
  }

  makeAdmin(id) {
    console.log(id);
    return this.http.patch(environment.apiBaseUserUrl, id, this.noAuthHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayLoad() {
    const token = this.getToken();
    if (token) {
      const userPayLoad = atob(token.split('.')[1]);
      // console.log(userPayLoad);
      return JSON.parse(userPayLoad);
    } else {
      return null;
    }
  }

  isAdminLoggedIn() {
    const userPayLoad = this.getUserPayLoad();
    if (userPayLoad && userPayLoad.admin) {
      console.log('this admin is legit!');
      return userPayLoad.exp > Date.now() / 1000;
    }
  }

  isLoggedIn() {
    const userPayLoad = this.getUserPayLoad();
    if (userPayLoad) {
      return userPayLoad.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
