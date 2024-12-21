import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

export interface Reservation {
  id?: number;
  userId: number;
  sessionId: number;
  seatNumber: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //Récupère les réservations pour une session donnée
  getReservationsBySession(sessionId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/sessions/${sessionId}/reservations`);
  }

  //  Ajoute de nouvelles réservations
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservations`, reservation);
  }

  //Récupère les réservations pour un utilisateur donnée
  getReservationsByUser(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations?userId=${userId}`);
  }

  // Supprime une réservation par son ID
  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/reservations/${reservationId}`);
  }

  // Met à jour les places disponibles pour une session
  updateSeatsAvailable(sessionId: number, decrementBy: number = 1): Observable<null> {
    return this.http.get<{ seatsAvailable: number }>(`${this.baseUrl}/sessions/${sessionId}`).pipe(
      switchMap((session) => {
        const updatedSeats = session.seatsAvailable - decrementBy;
        if (updatedSeats < 0) {
          throw new Error('Plus de sièges disponibles.');
        }
        return this.http.patch<void>(`${this.baseUrl}/sessions/${sessionId}`, {
          seatsAvailable: updatedSeats,
        });
      }),
      map(() => null)
    );
  }

}
