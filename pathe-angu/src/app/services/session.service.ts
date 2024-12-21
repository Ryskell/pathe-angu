import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Session {
  id: number;
  movieId: number;
  date: string;
  time: string;
  seatsAvailable: number;
}
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/sessions';

  constructor(private http: HttpClient) { }

  getSessionsByMovieId(movieId: number): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}?movieId=${movieId}`);
  }
}
