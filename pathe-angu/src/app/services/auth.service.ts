import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id?: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`);
  }
}
