import {
  HttpClient,
  HttpHeaderResponse,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { filter, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  isConnected = false;

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        environment.apiUrl + '/auth/login',
        { email, password },
        { withCredentials: false, observe: 'response' },
      )
      .pipe(
        tap((response) => {
          this.isConnected = response.status === 200;
          console.log(this.isConnected);
          this.router.navigateByUrl('/');
        }),
      );
  }

  logout() {
    this.http
      .get(environment.apiUrl + '/auth/logout')
      .pipe(
        tap(() => {
          this.isConnected = false;
          this.router.navigateByUrl('/login');
        }),
      )
      .subscribe();
  }

  me() {
    return this.http
      .get(environment.apiUrl + '/auth/me', { observe: 'response' })
      .pipe(
        tap((response) => {
          console.log(response.status);
          this.isConnected = response.status === 200;
          console.log(this.isConnected);
          this.router.navigateByUrl('/');
        }),
      );
  }
}
