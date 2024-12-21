import { Component, OnInit } from '@angular/core';
import { ReservationService, Reservation } from '../services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) { }

  groupedReservations: { sessionId: number; seats: number[] }[] = [];

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Utilisateur non connecté');
      return;
    }

    this.reservationService.getReservationsByUser(Number(userId)).subscribe({
      next: (data: Reservation[]) => {
        console.log('Données reçues:', data);
        this.reservations = data;

        this.groupedReservations = this.groupReservationsBySession(data);
      },
      error: (err) => console.error('Erreur lors de la récupération des réservations:', err),
    });
  }

  groupReservationsBySession(reservations: Reservation[]): { sessionId: number; seats: number[] }[] {
    return reservations.reduce((acc, reservation) => {
      const existingGroup = acc.find((group) => group.sessionId === reservation.sessionId);

      if (existingGroup) {
        existingGroup.seats.push(reservation.seatNumber);
      } else {
        acc.push({ sessionId: reservation.sessionId, seats: [reservation.seatNumber] });
      }

      return acc;
    }, [] as { sessionId: number; seats: number[] }[]);
  }

  cancelReservationBySeat(sessionId: number, seatNumber: number): void {
    const reservation = this.reservations.find(
      (r) => r.sessionId === sessionId && r.seatNumber === seatNumber
    );

    if (!reservation || !reservation.id) {
      console.error('Réservation introuvable ou ID manquant');
      return;
    }

    this.reservationService.deleteReservation(reservation.id).subscribe({
      next: () => {
        console.log('Réservation annulée:', reservation.id);

        this.reservations = this.reservations.filter((r) => r.id !== reservation.id);
        this.groupedReservations = this.groupReservationsBySession(this.reservations);

        this.reservationService.updateSeatsAvailable(sessionId, -1).subscribe({
          next: () => {
            console.log(`Siège disponible incrémenté pour la session ${sessionId}`);
          },
          error: (err) => console.error('Erreur lors de la mise à jour des sièges disponibles:', err),
        });
      },
      error: (err) => console.error('Erreur lors de l\'annulation de la réservation:', err),
    });
  }
}
