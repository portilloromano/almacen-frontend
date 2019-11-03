import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movement } from '../models/Movement';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  movementList(token: string, page: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token)
      .set('page', page);

    return this._http.get(this.url + '/movement/', { headers: headers });
  }

  movementListSearch(token: string, page: string, search: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token)
      .set('search', search)
      .set('page', page);

    return this._http.get(this.url + '/movement/search/', { headers: headers });
  }

  movementById(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + `/movement/${id}`, { headers: headers });
  }

  movementCreate(token: string, movement: Movement): Observable<any> {
    let json = JSON.stringify(movement);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + '/movement/', params, { headers: headers });
  }
}
