import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  titre: string;
  rating: number;
  comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) { }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }
}
