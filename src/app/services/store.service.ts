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
}
