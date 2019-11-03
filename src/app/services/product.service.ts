import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
  }

  productList(token: string, page: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + '/product/', { headers: headers });
  }

  productListSearch(token: string, page: string, search: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token)
      .set('search', search)
      .set('page', page);

    return this._http.get(this.url + '/product/search/', { headers: headers });
  }

  productById(token: string, id: number): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + `/product/${id}`, { headers: headers });
  }

  productCreate(token: string, product: Product): Observable<any> {
    let json = JSON.stringify(product);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + '/product/', params, { headers: headers });
  }

  productEdit(token: string, product: Product): Observable<any> {
    let json = JSON.stringify(product);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + '/product/', params, { headers: headers });
  }
}
