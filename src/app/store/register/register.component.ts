import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  userAndPassword = {
    username: '',
    password: '',
  };

  registrar() {
    console.log('click');
    this.authService.register(this.userAndPassword).subscribe((resp) => {
      console.log(resp);
    });
  }
}
