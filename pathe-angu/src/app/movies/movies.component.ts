import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.error('Erreur lors de la récupération des films', err)
    });
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
}
