import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Category } from '../Interfaces/category.interface';
import { ConstData } from '../Interfaces/const.interface';
import { Products, ProductsPaginate } from '../Interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://storeapi-production-1f58.up.railway.app/apiStore/';

  getData(): Observable<Products> {
    return this.httpClient
      .get<Products>(`${this.apiUrl}products/ `)
      .pipe(catchError(this.handleError));
  }

  getDataConst(): Observable<ConstData[]> {
    return this.httpClient
      .get<ConstData[]>(`${this.apiUrl}constData/`)
      .pipe(catchError(this.handleError));
  }
  addConstData(dataConst: ConstData): Observable<ConstData> {
    const token = localStorage.getItem('token'); // O el método que uses para obtener el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Añadimos el token en el encabezado
    });

    return this.httpClient
      .post<ConstData>(`${this.apiUrl}constData/newConstData`, dataConst, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  Paginar(paginate: number, category?: string): Observable<ProductsPaginate> {
    let limit = 6;
    return this.httpClient
      .get<ProductsPaginate>(
        `${this.apiUrl}products/paginate?category=${category}&start=${
          paginate * limit
        }&limit=${limit}`
      )
      .pipe(catchError(this.handleError));
  }
  // .get<Products[]>(`${this.apiUrl}products/search?name=${search}`)
  getSearch(search: string, paginate: number): Observable<ProductsPaginate> {
    let limit = 6;
    return this.httpClient
      .get<ProductsPaginate>(
        `${this.apiUrl}products/search?name=${search}&start=${
          paginate * limit
        }&limit=${limit}`
      )
      .pipe(catchError(this.handleError));
  }

  addProduct(product: Products): Observable<Products> {
    const token = localStorage.getItem('token'); // O el método que uses para obtener el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Añadimos el token en el encabezado
    });

    return this.httpClient
      .post<Products>(`${this.apiUrl}products/product`, product, { headers })
      .pipe(catchError(this.handleError));
  }

  getProductByName(name: string): Observable<Products[]> {
    return this.httpClient
      .get<Products[]>(`${this.apiUrl}products/name?name=${name}`)
      .pipe(catchError(this.handleError));
  }

  getCategorias(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(`${this.apiUrl}categories/`)
      .pipe(catchError(this.handleError));
  }

  addCategory(category: any) {
    const token = localStorage.getItem('token'); // O el método que uses para obtener el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Añadimos el token en el encabezado
    });

    return this.httpClient
      .post(`${this.apiUrl}categories/category`, category, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';

    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Errores del lado del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }

    // Podrías enviar el error a un servicio de logging aquí
    console.error(errorMessage);
    return throwError(errorMessage); // Re-lanzar el error para que lo maneje el suscriptor
  }
}
