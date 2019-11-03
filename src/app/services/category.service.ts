import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  categoryList(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + '/category/', { headers: headers });
  }

  categoryById(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + `/category/${id}`, { headers: headers });
  }

  categoryCreate(token: string, category: Category): Observable<any> {
    let json = JSON.stringify(category);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + '/category/', params, { headers: headers });
  }

  categoryEdit(token: string, category: Category): Observable<any> {
    let json = JSON.stringify(category);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + '/category/', params, { headers: headers });
  }
}
