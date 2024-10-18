import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Interfaces/category.interface';
import { ConstData } from '../Interfaces/const.interface';
import { Products } from '../Interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://storeapi-production-1f58.up.railway.app/apiStore/';

  getData(): Observable<Products> {
    return this.httpClient.get<Products>(`${this.apiUrl}products/ `);
  }

  getDataConst(): Observable<ConstData[]> {
    return this.httpClient.get<ConstData[]>(`${this.apiUrl}constData/`);
  }

  Paginar(paginate: number, category?: string): Observable<Products> {
    let limit = 6;
    if (category) {
      return this.httpClient.get<Products>(
        `${this.apiUrl}products/paginate?category=${category}&start=${paginate}&limit=${limit}`
      );
    } else {
      return this.httpClient.get<Products>(
        `${this.apiUrl}products/?start=${paginate}&limit=${limit}`
      );
    }
  }

  addProduct(product: Products) {
    return this.httpClient.post(`${this.apiUrl}products/product`, product);
  }

  getProductByName(name: string): Observable<Products[]> {
    return this.httpClient.get<Products[]>(
      `${this.apiUrl}products/name?name=${name}`
    );
  }

  getCategorias(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}categories/`);
  }
}
