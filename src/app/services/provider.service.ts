import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/Provider';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  providerList(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + '/provider/', { headers: headers });
  }

  providerById(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + `/provider/${id}`, { headers: headers });
  }

  providerCreate(token: string, provider: Provider): Observable<any> {
    let json = JSON.stringify(provider);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + '/provider/', params, { headers: headers });
  }

  providerEdit(token: string, provider: Provider): Observable<any> {
    let json = JSON.stringify(provider);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + '/provider/', params, { headers: headers });
  }
}
