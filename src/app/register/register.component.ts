import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register() {
    this.authService
      .register(this.name, this.email, this.password, this.password)
      .subscribe(
        (response: { access_token: string }) => {
          this.authService.setToken(response.access_token);

          // Mostrar mensaje de éxito
          this.snackBar.open(
            'Registro completado correctamente. Por favor, inicia sesión.',
            'Cerrar',
            {
              duration: 5000, // Tiempo en milisegundos que el mensaje estará visible
              panelClass: ['snack-success'], // Clase CSS para personalizar el estilo
            }
          );

          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Error al registrar:', error);

          // Mostrar mensaje de error
          this.snackBar.open(
            'Error al registrar. Por favor, inténtalo de nuevo.',
            'Cerrar',
            {
              duration: 5000,
              panelClass: ['snack-error'], // Clase CSS para personalizar el estilo
            }
          );
        }
      );
  }
}
