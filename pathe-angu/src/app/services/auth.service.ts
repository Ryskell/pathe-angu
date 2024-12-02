import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  email: string;
  password: string;
  pseudo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    const newUser = { ...user, id: Math.floor(Math.random() * 1000) };
    return this.http.post<User>(this.baseUrl, newUser);
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`);
  }
}
