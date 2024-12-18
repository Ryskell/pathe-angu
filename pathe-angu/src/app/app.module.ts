import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HomeComponent, NavbarComponent, MoviesComponent, MovieDetailsComponent, ReservationComponent, MyReservationsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
