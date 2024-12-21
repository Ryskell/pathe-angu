import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onLogin(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(email, password).subscribe({
        next: (users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('userId', user.id.toString());
            localStorage.setItem('pseudo', user.pseudo);
            alert('Connexion réussie');
            this.router.navigate(['/home']);
          } else {
            alert('Email ou mot de passe incorrect');
          }
        },
        error: () => alert('Erreur lors de la connexion'),
      });
    }
  }
}
