import { Component } from '@angular/core';
import { Filament } from '../../Interfaces/filament.interface';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-filament',
  templateUrl: './add-filament.component.html',
  styleUrl: './add-filament.component.scss',
})
export class AddFilamentComponent {
  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  //filament
  filament: Filament = {
    // marca: '',
    disponibilidad: true,
    color: '',
    imagenes: [],
  };

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
  }

  getDataForm(data: Filament) {
    this.filament = data;
    this.addFilament();
  }

  addFilament() {
    if (this.filament.color != '') {
      this.storeService.addFilament(this.filament).subscribe(
        () => {
          this.AlertStatus = true;
          this.typeAlert = 'success';
          this.mensaje = 'La creacion del nuevo filamento fue exitosa';
          this.url = '/addFilament';
          this.buttonText = 'Continuar';
        },
        (error) => {
          this.AlertStatus = true;
          this.typeAlert = 'error';
          this.mensaje = error;
          this.url = '/addFilament';
          this.buttonText = 'Reintentar';
        }
      );
    } else {
      this.AlertStatus = true;
      this.typeAlert = 'error';
      this.mensaje =
        'Rellene todos los campos para registrar un nuevo filamento';
      this.url = '/addFilament';
      this.buttonText = 'Reintentar';
    }
  }

  cleanForm() {
    this.AlertStatus = false;
  }
}
