import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { Filament } from '../../Interfaces/filament.interface';

@Component({
  selector: 'app-delete-filament',
  templateUrl: './delete-filament.component.html',
  styleUrl: './delete-filament.component.scss',
})
export class DeleteFilamentComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
    this.getFilaments();
  }

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  category: Filament = {
    color: '',
    imagenes: [],
  };

  filaments: Filament[] = [];

  filament = 'seleccione un color';

  DeleteFilament() {
    if (this.filament !== 'seleccione una filament') {
      this.storeService.deleteFilament(this.filament).subscribe(
        () => {
          this.AlertStatus = true;
          this.typeAlert = 'success';
          this.mensaje = `Se elimino la filament ${this.filament} `;
          this.url = '/DeleteFilament';
          this.buttonText = 'Continuar';
          this.getFilaments();
        },
        (error) => {
          console.log(error);
          this.AlertStatus = true;
          this.typeAlert = 'error';
          this.mensaje = error.alert;
          this.url = '/DeleteFilament';
          this.buttonText = 'Continuar';
        }
      );
    } else {
      this.AlertStatus = true;
      this.typeAlert = 'error';
      this.mensaje =
        'no fue posible eliminar la filament comunicate con Pablo. Es un tipaso';
      this.url = '/DeleteCategories';
      this.buttonText = 'Continuar';
    }
  }

  cleanFormUser() {
    this.AlertStatus = false;
  }

  getFilaments() {
    this.storeService.getFilaments().subscribe((resp) => {
      this.filaments = resp;
    });
    this.filament = 'seleccione un color';
  }
}
