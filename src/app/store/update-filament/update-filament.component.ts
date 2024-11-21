import { Component } from '@angular/core';
import { Filament } from '../../Interfaces/filament.interface';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-filament',
  templateUrl: './update-filament.component.html',
  styleUrl: './update-filament.component.scss',
})
export class UpdateFilamentComponent {
  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  selectedFilament: Filament = {
    disponibilidad: true,
    color: '',
    imagenes: [],
  };

  filaments: Filament[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();

    this.storeService.getFilaments().subscribe((resp) => {
      this.filaments = resp;
    });
    if (this.filaments.length > 0) {
      this.selectedFilament = this.filaments[0];
    }
  }

  cleanForm() {
    this.AlertStatus = false;
  }

  updateFilament() {
    if (this.selectedFilament.color != '') {
      this.storeService.updateFilament(this.selectedFilament).subscribe(
        () => {
          this.AlertStatus = true;
          this.typeAlert = 'success';
          this.mensaje = 'se actualizo el filamento';
          this.url = '/UpdateFilaments';
          this.buttonText = 'Continuar';
        },
        (error) => {
          this.AlertStatus = true;
          this.typeAlert = 'error';
          this.mensaje = error;
          this.url = '/UpdateFilaments';
          this.buttonText = 'Reintentar';
        }
      );
    } else {
      this.AlertStatus = true;
      this.typeAlert = 'error';
      this.mensaje =
        'Rellene todos los campos para registrar un nuevo filamento';
      this.url = '/UpdateFilaments';
      this.buttonText = 'Reintentar';
    }
  }
}
