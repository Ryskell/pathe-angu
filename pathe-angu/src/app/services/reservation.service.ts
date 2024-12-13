import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  id?: number; // Identifiant de la réservation
  userId: number; // Identifiant de l'utilisateur
  sessionId: number; // Identifiant de la session
  seatNumber: number; // Numéro de siège réservé
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Récupère les réservations pour une session donnée
   * @param sessionId Identifiant de la session
   * @returns Observable des réservations
   */
  getReservationsBySession(sessionId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/sessions/${sessionId}/reservations`);
  }


  //  Ajoute de nouvelles réservations
  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservations`, reservation);
  }




  /**
   * Supprime une réservation par son ID
   * @param reservationId Identifiant de la réservation
   * @returns Observable du résultat de l'opération
   */
  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reservations/${reservationId}`);
  }

  /**
   * Met à jour une réservation existante
   * @param reservationId Identifiant de la réservation
   * @param updatedReservation Données mises à jour
   * @returns Observable du résultat de l'opération
   */
  updateReservation(reservationId: number, updatedReservation: Reservation): Observable<any> {
    return this.http.put(`${this.baseUrl}/reservations/${reservationId}`, updatedReservation);
  }
}
