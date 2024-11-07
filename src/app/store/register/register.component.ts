import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
  }

  userAndPassword = {
    username: '',
    password: '',
  };

  registrar() {
    this.authService.register(this.userAndPassword).subscribe(
      (resp) => {
        this.AlertStatus = true;
        this.typeAlert = 'success';
        this.mensaje = 'El nuevo usuario fue registrado con exito';
        this.url = '/';
        this.buttonText = 'Ir a inicio';
      },
      (error) => {
        this.AlertStatus = true;
        this.typeAlert = 'error';
        this.mensaje =
          'ha ocurrido un error al intentar crear un nuevo Usuario';
        this.url = '/register';
        this.buttonText = 'Reintentar';
      }
    );
  }

  cleanFormUser() {
    this.userAndPassword.password = '';
    this.userAndPassword.username = '';
  }
}
