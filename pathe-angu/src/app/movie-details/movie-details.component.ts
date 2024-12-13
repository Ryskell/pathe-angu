import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieService } from '../services/movie.service';
import { Session, SessionService } from '../services/session.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  sessions: Session[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (!movieId) {
      console.error('Invalid movie ID');
      return;
    }

    this.movieService.getMovieById(movieId).subscribe({
      next: (movie) => {
        this.movie = movie;

        this.sessionService.getSessionsByMovieId(movieId).subscribe({
          next: (sessions) => {
            this.sessions = sessions;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération des sessions:', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du film:', err);
      }
    });
  }
}
