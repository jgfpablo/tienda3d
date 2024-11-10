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
        this.AlertStatus = true;
        this.typeAlert = 'error';
        this.mensaje = error;
        this.url = '/login';
        this.buttonText = 'Reintentar';
      }
    );
  }

  getDataUser(userData: any) {
    this.userAndPassword = userData;
    this.login();
  }

  cleanFormUser() {
    this.userAndPassword.password = '';
    this.userAndPassword.username = '';
    this.AlertStatus = false;
  }
}
