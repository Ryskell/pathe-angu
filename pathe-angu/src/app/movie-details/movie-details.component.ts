import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id')); // Convertit en nombre
    console.log('Movie ID:', movieId);
  
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        console.log('Movies:', movies);
        this.movie = movies.find((m) => m.id === movieId) || null; // Comparaison correcte
        if (!this.movie) {
          console.warn(`Movie with ID ${movieId} not found`);
        } else {
          console.log('Movie found:', this.movie);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des films:', err);
      }
    });
  }
  
  
  
}
