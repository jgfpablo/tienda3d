import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { Category } from '../Interfaces/category.interface';
import { ConstData } from '../Interfaces/const.interface';
import { Products, ProductsPaginate } from '../Interfaces/products.interface';
import { Filament } from '../Interfaces/filament.interface';

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
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
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

  addCategory(category: Category) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    category.nombre = this.formatString(category.nombre);

    return this.httpClient
      .post(`${this.apiUrl}categories/category`, category, { headers })
      .pipe(catchError(this.handleError));
  }

  formatString(name: string): string {
    if (typeof name !== 'string') {
      throw new Error('El argumento debe ser una cadena de texto.');
    }

    const palabras = name.split(/\s+/);

    const resultado = palabras
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join('');

    return resultado;
  }

  deleteCategory(category: string) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .post(
        `${this.apiUrl}categories/delete`,
        { nombre: category },
        { headers }
      )
      .pipe(
        tap(() => this.categoriaEliminada.next()),
        catchError(this.handleError)
      );
  }

  private categoriaEliminada = new Subject<void>();

  getCategoriaEliminadaObservable(): Observable<void> {
    return this.categoriaEliminada.asObservable();
  }

  deletProduct(product: string) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .post(`${this.apiUrl}products/delete`, { nombre: product }, { headers })
      .pipe(catchError(this.handleError));
  }

  addFilament(filament: Filament) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    filament.color = this.formatString(filament.color);

    return this.httpClient
      .post(`${this.apiUrl}filaments/filament`, filament, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteFilament(filament: string) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .post(`${this.apiUrl}filaments/delete`, { color: filament }, { headers })
      .pipe(catchError(this.handleError));
  }

  getFilaments(): Observable<Filament[]> {
    return this.httpClient
      .get<Filament[]>(`${this.apiUrl}filaments/`)
      .pipe(catchError(this.handleError));
  }

  updateProduct(product: Products, name: string) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient
      .put(
        `${this.apiUrl}products/updateProduct`,
        { product, name },
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  updateFilament(filament: Filament) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient
      .put(`${this.apiUrl}filaments/updateFilament`, { filament }, { headers })
      .pipe(catchError(this.handleError));
  }

  updateCategory(category: Category) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient
      .put(`${this.apiUrl}categories/updateCategory`, { category }, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error;
    console.log(error);

    return throwError(errorMessage.error);
  }
}
