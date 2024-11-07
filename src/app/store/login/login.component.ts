import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Token } from '../../Interfaces/token.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated() == true) {
      this.router.navigate(['/']);
    }
  }

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  userAndPassword = {
    username: '',
    password: '',
  };

  login() {
    this.authService.login(this.userAndPassword).subscribe(
      (resp: Token) => {
        console.log('me logue');
        this.AlertStatus = true;
        this.typeAlert = 'success';
        this.mensaje = 'Su ingreso fue exitoso';
        this.url = '/';
        this.buttonText = 'Dirigirme a inicio';
      },
      (error) => {
        // console.error('Error al registrar:', error);
        this.AlertStatus = true;
        this.typeAlert = 'error';
        this.mensaje = 'ha ocurrido un error al intentar realizar el login';
        this.url = '/login';
        this.buttonText = 'Reintentar';
      }
    );
  }

  cleanFormUser() {
    this.userAndPassword.password = '';
    this.userAndPassword.username = '';
    this.AlertStatus = false;
  }
}
