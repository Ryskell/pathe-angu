import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  onRegister(form: NgForm) {
    if (form.valid) {
      this.authService.register(form.value).subscribe({
        next: () => alert('Inscription réussie'),
        error: () => alert('Erreur lors de l\'inscription')
      });
    }
  }
}
