import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa FormsModule aquí
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string='';
  password: string='';

  constructor(private authService: AuthService) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.authService.register(this.username, this.password).subscribe(response => {
        console.log('Usuario registrado', response);
      }, error => {
        console.error('Error en el registro', error);
      });
    }
  }
}
