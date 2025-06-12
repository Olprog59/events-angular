import {
  HttpClient,
  HttpHeaderResponse,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { filter, tap } from 'rxjs';

export interface AuthResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  isConnected = false;

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        environment.apiUrl + '/auth/login',
        { email, password },
        { withCredentials: true, observe: 'response' },
      )
      .pipe(
        tap((response: HttpResponse<AuthResponse>) => {
          console.log('Status:', response.status);
        }),
      );
  }
}
