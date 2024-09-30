import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Products } from '../../Interfaces/products.interface';
import { ConstData } from '../../Interfaces/const.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  dataProducts: Products[] = [];
  dataConst: ConstData | undefined;
  productPrices: any[] = [];
  price = 0;
  description = false;
  paginate = 0;
  listPaginacion: number[] = [];
  category: string = ''; // Variable para la categoría

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener la categoría desde la URL
    this.activatedRoute.params.subscribe((params) => {
      this.category = params['category'];
      this.loadProducts();
    });

    // Obtener datos adicionales (constantes)
    this.storeService.getDataConst().subscribe((data) => {
      this.dataConst = data.data;
      this.calcular();
    });
  }

  // Cargar productos según la categoría
  loadProducts(): void {
    if (!this.category) {
      this.storeService.getDataPaginate(0).subscribe((data) => {
        this.handleProductResponse(data);
      });
    } else {
      this.storeService
        .getDataPaginateCategory(0, this.category)
        .subscribe((data) => {
          this.handleProductResponse(data);
        });
    }
  }

  handleProductResponse(data: any): void {
    this.dataProducts = data.data;
    for (let index = 0; index < data.total / 6; index++) {
      this.listPaginacion[index] = index;
    }
  }

  calcular() {
    if (!this.dataConst || this.dataProducts.length === 0) {
      setTimeout(() => this.calcular(), 500);
      return;
    }

    this.dataProducts.forEach((product) => {
      const productPrice =
        product.precio || this.calcularPreciosProductos(product);
      this.productPrices.push(productPrice);
    });
  }

  calcularPreciosProductos(product: Products): number {
    const KwH =
      (Number(this.dataConst?.consumoKw) / 1000 / 60) * Number(product.tiempo);
    const costoEnergia = KwH * this.dataConst?.costokwH!;
    const costoFilamento =
      (Number(product?.peso) * Number(this.dataConst?.filamento)) / 1000;
    const depresiacion =
      (Number(this.dataConst?.costImpr) /
        Number(this.dataConst?.vidaUtil) /
        60) *
      Number(product?.tiempo);
    const merma =
      (Number(product?.peso) *
        (Number(this.dataConst?.merma) / 100) *
        Number(this.dataConst?.filamento)) /
      1000;
    const ganancia =
      (costoEnergia + costoFilamento + depresiacion + merma) *
      (this.dataConst?.ganan! / 100);
    const gastos = costoEnergia + costoFilamento + depresiacion + merma;

    return this.redondear(gastos + ganancia);
  }

  redondear(numero: number): number {
    const redondeo50 = Math.ceil(numero / 50) * 50;
    return redondeo50 % 100 === 0 ? redondeo50 : redondeo50;
  }

  paginacion(paginate: number) {
    if (!this.category) {
      this.storeService.getDataPaginate(paginate * 6).subscribe((data) => {
        this.handleProductResponse(data);
        this.paginate = paginate;
      });
    } else {
      this.storeService
        .getDataPaginateCategory(paginate * 6, this.category)
        .subscribe((data) => {
          this.handleProductResponse(data);
          this.paginate = paginate;
        });
    }
  }
}
