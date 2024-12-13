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
    // Récupérer le pseudo depuis le localStorage
    this.pseudo = localStorage.getItem('pseudo');
  }

  logout() {
    // Supprimer les données du localStorage
    localStorage.removeItem('pseudo');
    localStorage.removeItem('userId'); // Si d'autres données sont à supprimer, ajoute-les ici
    alert('Déconnexion réussie');
    this.router.navigate(['/login']);
  }
}
