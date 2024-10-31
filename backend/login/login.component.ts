import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.login(this.username, this.password).subscribe(response => {
        console.log('Usuario autenticado', response);
      }, error => {
        console.error('Error en el inicio de sesión', error);
      });
    }
  }
}
