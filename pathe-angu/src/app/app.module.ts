import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { CinemaReviewComponent } from './cinema-review/cinema-review.component';
import { RatingTextPipe } from './pipes/rating-text.pipe';
import { HighlightInvalidDirective } from './directives/highlight-invalid.directive';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HomeComponent, NavbarComponent, MoviesComponent, MovieDetailsComponent, ReservationComponent, MyReservationsComponent, CinemaReviewComponent, RatingTextPipe, HighlightInvalidDirective],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
