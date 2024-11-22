import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Token } from '../Interfaces/token.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://storeapi-production-1f58.up.railway.app/apiStore/users';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response: Token) => {
          localStorage.setItem('NocturaToken', response.token);
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('NocturaToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('NocturaToken');
  }

  register(userAndPassword: any) {
    const token = localStorage.getItem('NocturaToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .post(`${this.apiUrl}/register`, userAndPassword, { headers })
      .pipe(catchError(this.handleError));
  }

  getTokenTimeLeft() {
    const token = localStorage.getItem('NocturaToken') || '';

    if (token.split('.').length !== 3) {
      this.logout();
      this.router.navigate(['/login']);
      return;
    }

    const payloadBase64 = token.split('.')[1];
    try {
      const payload = JSON.parse(atob(payloadBase64));
      const expirationDate = payload.exp * 1000;
      const expirate = expirationDate - Date.now();

      if (expirate <= 0) {
        this.logout();
        this.router.navigate(['/login']);
      }
    } catch (error) {
      this.logout();
      this.router.navigate(['/login']);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = error.error;

    return throwError(errorMessage.error);
  }
}
