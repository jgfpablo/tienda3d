import { Component, Input, SimpleChanges } from '@angular/core';
import { Products } from '../../Interfaces/products.interface';
import { ConstData } from '../../Interfaces/const.interface';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss',
})
export class CardProductsComponent {
  @Input() product: Products | undefined;
  @Input() dataConst: ConstData | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataConst && this.product) {
      this.superFuncion();
    } else {
      console.log('Esperando datos');
    }
  }

  price = 0;

  description = false;

  superFuncion() {
    if (!this.dataConst || !this.product) {
      console.log('Datos insuficientes');
      return;
    }

    let KwH =
      (Number(this.dataConst?.consumoKw) / 1000 / 60) *
      Number(this.product?.tiempo);

    let costoEnergia = KwH * this.dataConst.costokwH;

    let costoFilamento =
      (Number(this.product?.peso) * Number(this.dataConst?.filamento)) / 1000;

    let depresiacion =
      (Number(this.dataConst?.costImpr) /
        Number(this.dataConst?.vidaUtil) /
        60) *
      Number(this.product?.tiempo);

    let merma =
      (Number(this.product?.peso) *
        (Number(this.dataConst?.merma) / 100) *
        Number(this.dataConst?.filamento)) /
      1000;

    let ganancia =
      (costoEnergia + costoFilamento + depresiacion + merma) *
      (this.dataConst.ganan / 100);

    let gastos = costoEnergia + costoFilamento + depresiacion + merma;

    this.price = this.redondear(gastos + ganancia);
  }

  redondear(numero: number) {
    // Primero redondeamos al múltiplo de 50 más cercano hacia arriba
    let redondeo50 = Math.ceil(numero / 50) * 50;

    // Si el múltiplo de 50 ya es múltiplo de 100, simplemente retornamos ese valor
    if (redondeo50 % 100 === 0) {
      return redondeo50;
    }

    // Si no es múltiplo de 100, devolvemos el redondeo al múltiplo de 50
    return redondeo50;
  }
}
