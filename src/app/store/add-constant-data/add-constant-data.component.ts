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
    console.log(this.constData);
    this.storeService.addConstData(this.constData).subscribe(
      (response) => {
        console.log('nueva data constante agregada', response);
      },
      (error) => {
        console.error('fallo la carga de la data constante:', error);
      }
    );
  }
}
