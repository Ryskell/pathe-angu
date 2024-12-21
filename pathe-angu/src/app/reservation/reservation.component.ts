import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReservationService, Reservation } from '../services/reservation.service';
import { concat, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

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
  cols: number[] = Array(10).fill(0);
  rows: number[] = Array(5).fill(0);

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.sessionId = Number(this.route.snapshot.paramMap.get('id'));

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

    const selectedSeatData = this.selectedSeats.map((seat: Seat) => ({
      userId: Number(userId),
      sessionId: this.sessionId,
      seatNumber: this.getSeatNumber(seat.row, seat.col),
    }));

    let observableChain = of(null);

    selectedSeatData.forEach((seat) => {
      observableChain = observableChain.pipe(
        concatMap(() =>
          this.reservationService.addReservation(seat).pipe(
            concatMap(() =>
              this.reservationService.updateSeatsAvailable(this.sessionId)
            )
          )
        )
      );
    });

    observableChain.subscribe({
      next: () => console.log('Toutes les réservations et mises à jour sont terminées.'),
      error: (err) => console.error('Une erreur est survenue:', err),
      complete: () => {
        console.log('Redirection vers la page d\'accueil.');
        this.router.navigate(['/home']);
      }
    });
  }
}
