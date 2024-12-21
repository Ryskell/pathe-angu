import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  pseudo: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.pseudo = localStorage.getItem('pseudo');
  }

  logout() {
    localStorage.removeItem('pseudo');
    localStorage.removeItem('userId');
    alert('Déconnexion réussie');
    this.router.navigate(['/login']);
  }
}
