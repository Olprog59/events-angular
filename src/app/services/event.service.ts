import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  organizer: User;
  participants: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http: HttpClient = inject(HttpClient);
  private url = `${environment.apiUrl}/events`;

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url, { withCredentials: true }).pipe(
      catchError((err) => {
        console.log('Erreur de chargement des events');
        return throwError(() => err);
      }),
    );
  }
}
