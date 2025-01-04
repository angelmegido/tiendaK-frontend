import { Component } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.name, this.email, this.password, this.password)
      .subscribe(
        (response: { access_token: string }) => {
          this.authService.setToken(response.access_token);
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error al registrar:', error);
        }
      );
  }
}
