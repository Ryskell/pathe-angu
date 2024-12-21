import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onRegister(form: NgForm) {
    if (form.valid) {
      this.authService.register(form.value).subscribe({
        next: () => {
          alert('Inscription réussie');
          this.router.navigate(['/login']);
        },
        error: () => alert('Erreur lors de l\'inscription'),
      });
    }
  }
}
