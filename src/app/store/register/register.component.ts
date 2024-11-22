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
    // this.authService.getTokenTimeLeft();
  }

  userAndPassword = {
    username: '',
    password: '',
  };

  register() {
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
        this.mensaje = error;
        this.url = '/register';
        this.buttonText = 'Reintentar';
      }
    );
  }

  getDataUser(userData: any) {
    this.userAndPassword = userData;
    this.register();
  }
  cleanFormUser() {
    this.userAndPassword.password = '';
    this.userAndPassword.username = '';
    this.AlertStatus = false;
  }
}
