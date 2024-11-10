import { Component } from '@angular/core';
import { ConstData } from '../../Interfaces/const.interface';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-constant-data',
  templateUrl: './add-constant-data.component.html',
  styleUrl: './add-constant-data.component.scss',
})
export class AddConstantDataComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
  }

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  constData: ConstData = {
    consumoKw: 360,
    costImpr: 500000,
    vidaUtil: 10000,
    costokwH: 30,
    costoTiempoHombre: 0,
    merma: 5,
    riesgo: 0,
    ganan: 100,
    filamento: 17000,
  };

  addConstData() {
    this.storeService.addConstData(this.constData).subscribe(
      (response) => {
        this.AlertStatus = true;
        this.typeAlert = 'success';
        this.mensaje = 'Nuevos datos constantes agregados';
        this.url = '/';
        this.buttonText = 'Dirigirme a inicio';
      },
      (error) => {
        this.AlertStatus = true;
        this.typeAlert = 'error';
        this.mensaje =
          'Rellene todos los campos para realizar un nuevo registro';
        this.url = '/addCategory';
        this.buttonText = 'Reintentar';
      }
    );
  }

  cleanForm() {
    this.AlertStatus = false;
  }
}
