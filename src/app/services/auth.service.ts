import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://storeapi-production-1f58.up.railway.app/apiStore/user/';

  constructor(private httpClient: HttpClient) {}

  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.httpClient
      .post(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // register(userAndPassword: any) {
  //   return this.httpClient
  //     .post(`${this.apiUrl}register`, userAndPassword)
  //     .pipe(tap(console.log), catchError(this.handleError));
  // }

  register(userAndPassword: any) {
    const token = localStorage.getItem('token'); // O el método que uses para obtener el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Añadimos el token en el encabezado
    });

    return this.httpClient
      .post(`${this.apiUrl}register`, userAndPassword, { headers }) // Pasamos los encabezados aquí
      .pipe(tap(console.log), catchError(this.handleError));
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
