import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(email, password).subscribe({
        next: (users) => {
          if (users.length > 0) {
            alert('Connexion réussie');
          } else {
            alert('Email ou mot de passe incorrect');
          }
        },
        error: () => alert('Erreur lors de la connexion')
      });
    }
  }
}
