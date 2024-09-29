import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Products } from '../../Interfaces/products.interface';
import { ConstData } from '../../Interfaces/const.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  dataProducts: Products[] = [];
  dataConst: ConstData | undefined;
  productPrices: any[] = [];

  price = 0;
  description = false;

  paginate = 0;

  listPaginacion: number[] = [];

  constructor(private storeService: StoreService) {
    storeService.getDataPaginate(0).subscribe((data) => {
      this.dataProducts = data.data;

      for (let index = 0; index < data.total / 6; index++) {
        this.listPaginacion[index] = index;
      }
    });

    storeService.getDataConst().subscribe((data) => {
      this.dataConst = data.data;
      this.calcular();
    });
  }

  calcular() {
    if (!this.dataConst || this.dataProducts.length === 0) {
      console.log('Fallo en la obtencion de datos');
      setTimeout(() => this.calcular(), 500);
      return;
    }

    this.dataProducts.forEach((product) => {
      if (product.precio == 0) {
        this.productPrices.push(this.calcularPreciosProductos(product));
      } else {
        this.productPrices.push(product.precio);
      }
    });
  }

  calcularPreciosProductos(product: Products) {
    if (!this.dataConst || !this.dataProducts) {
      console.log('Datos insuficientes');
      return;
    }

    let KwH =
      (Number(this.dataConst?.consumoKw) / 1000 / 60) * Number(product.tiempo);

    let costoEnergia = KwH * this.dataConst.costokwH;

    let costoFilamento =
      (Number(product?.peso) * Number(this.dataConst?.filamento)) / 1000;

    let depresiacion =
      (Number(this.dataConst?.costImpr) /
        Number(this.dataConst?.vidaUtil) /
        60) *
      Number(product?.tiempo);

    let merma =
      (Number(product?.peso) *
        (Number(this.dataConst?.merma) / 100) *
        Number(this.dataConst?.filamento)) /
      1000;

    let ganancia =
      (costoEnergia + costoFilamento + depresiacion + merma) *
      (this.dataConst.ganan / 100);

    let gastos = costoEnergia + costoFilamento + depresiacion + merma;

    this.price = this.redondear(gastos + ganancia);

    return this.price;
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

  paginar(paginacion: number) {
    this.storeService.getDataPaginate(paginacion).subscribe((data) => {
      this.dataProducts = data.data;
    });
    this.paginate = paginacion - 1;
  }

  paginacion(paginate: number) {
    this.storeService.getDataPaginate(paginate * 6).subscribe((data) => {
      this.dataProducts = data.data;
      this.calcular();
      this.paginate = paginate;
    });
  }

  getDataCategory(paginate: number) {
    this.storeService
      .getDataPaginateCategory(paginate * 6, 'llaveros')
      .subscribe((data) => {
        this.dataProducts = data.data;
        this.calcular();
        this.paginate = paginate;
      });
  }
}
