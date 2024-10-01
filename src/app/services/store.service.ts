import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = 'https://apitest-production-cd29.up.railway.app/';

  getData(): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'products');
  }

  getDataConst(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  Paginar(paginate: number, category?: string): Observable<any> {
    let limit = 6;
    if (category) {
      return this.httpClient.get(
        `https://apitest-production-cd29.up.railway.app/category/?category=${category}&start=${paginate}&limit=${limit}`
      );
    } else {
      return this.httpClient.get(
        `${this.apiUrl}products/?start=${paginate}&limit=${limit}`
      );
    }
  }

  addProduct(product: any) {
    return this.httpClient.post(`${this.apiUrl}products`, product);
  }
}
