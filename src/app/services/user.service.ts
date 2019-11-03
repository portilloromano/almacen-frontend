import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private token: string;
  private identity: any;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = global.url;
  }

  userList(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + '/user/', { headers: headers });
  }

  userById(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + `/user/${id}`, { headers: headers });
  }

  userCreate(token: string, user: User): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + '/user/', params, { headers: headers });
  }

  userEdit(token: string, user: User): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + '/user/', params, { headers: headers });
  }

  login(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + '/user/login', params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity != 'undefined') {
      let now = new Date().getTime() /1000;
      if (identity.exp < now) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['']);
      }
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    this.getIdentity();
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}
