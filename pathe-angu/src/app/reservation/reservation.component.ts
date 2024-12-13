import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReservationService, Reservation } from '../services/reservation.service';

interface Seat {
  row: number;
  col: number;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  sessionId!: number;
  selectedSeats: Seat[] = [];
  reservedSeats: Seat[] = [];
  cols: number[] = Array(10).fill(0); // Exemple de 10 colonnes
  rows: number[] = Array(5).fill(0);  // Exemple de 5 rangées

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.sessionId = Number(this.route.snapshot.paramMap.get('id'));

    // Récupérer les réservations pour la session
    this.reservationService.getReservationsBySession(this.sessionId).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
        this.reservedSeats = data.map((reservation) => ({
          row: Math.floor((reservation.seatNumber - 1) / this.cols.length),
          col: (reservation.seatNumber - 1) % this.cols.length,
        }));
      },
      error: (err) => console.error('Erreur lors de la récupération des réservations:', err),
    });
  }

  isSeatSelected(row: number, col: number): boolean {
    return this.selectedSeats.some((seat: Seat) => seat.row === row && seat.col === col);
  }

  isSeatReserved(row: number, col: number): boolean {
    return this.reservedSeats.some((seat: Seat) => seat.row === row && seat.col === col);
  }

  toggleSeatSelection(row: number, col: number): void {
    if (!this.isSeatReserved(row, col)) {
      const index = this.selectedSeats.findIndex((seat: Seat) => seat.row === row && seat.col === col);
      if (index === -1) {
        this.selectedSeats.push({ row, col });
      } else {
        this.selectedSeats.splice(index, 1);
      }
    }
  }

  getSeatNumber(row: number, col: number): number {
    return row * this.cols.length + col + 1;
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }

  confirmReservation(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Utilisateur non connecté');
      return;
    }

    // Pour chaque siège sélectionné, envoyer une requête d'ajout de réservation
    const selectedSeatData = this.selectedSeats.map((seat: Seat) => ({
      userId: Number(userId), // Utilise l'ID de l'utilisateur
      sessionId: this.sessionId, // Utilise l'ID de la session
      seatNumber: this.getSeatNumber(seat.row, seat.col), // Calcule le numéro du siège
    }));

    // Pour chaque siège, appeler addReservation de manière indépendante
    selectedSeatData.forEach(seat => {
      this.reservationService.addReservation(seat).subscribe(
        (response) => {
          console.log('Réservation pour siège ' + seat.seatNumber + ' confirmée:', response);
        },
        (error) => {
          console.error('Erreur lors de la réservation pour le siège ' + seat.seatNumber, error);
        }
      );
    });

    // Rediriger l'utilisateur vers la page d'accueil une fois toutes les réservations envoyées
    this.router.navigate(['/home']);
  }


}
