import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ConstData } from '../../Interfaces/const.interface';
import { Category } from '../../Interfaces/category.interface';
import { AuthService } from '../../services/auth.service';
import { FormProduct, Products } from '../../Interfaces/products.interface';
import { Filament } from '../../Interfaces/filament.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  categorias: Category[] = [];
  colores: Filament[] = [];
  dataConst: ConstData[] | undefined;
  lengthDC: number = 0;

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
    this.storeService.getDataConst().subscribe((data) => {
      this.dataConst = data;
      this.lengthDC = data.length - 1;
    });
    this.storeService.getCategorias().subscribe((resp) => {
      this.categorias = resp;
    });

    this.storeService.getFilaments().subscribe((resp) => {
      this.colores = resp;
    });
  }

  // horas: number = 0;
  // minutos: number = 0;
  // tiempo: number = 0;
  // peso: number = 0;

  product: Products = {
    nombre: '',
    descripcion: '',
    colores: [],
    precio: 0,
    categoria: '',
    imagenes: [],
    peso: 0,
    horas: 0,
    minutos: 0,
    alto: '',
    ancho: '',
    grosor: '',
    material: '',
  };

  addProduct() {
    console.log(this.product);
    if (
      Object.values(this.product).every(
        (value) => value !== null && value !== ''
      )
    ) {
      this.storeService.addProduct(this.product).subscribe(
        () => {
          this.AlertStatus = true;
          this.typeAlert = 'success';
          this.mensaje = 'La creacion del nuevo producto fue exitosa';
          this.url = '/addProduct';
          this.buttonText = 'Continuar Agregando productos';
        },
        (error) => {
          console.log(error);
          this.AlertStatus = true;
          this.typeAlert = 'error';
          this.mensaje = error;
          this.url = '/addProduct';
          this.buttonText = 'Reintentar';
        }
      );
    } else {
      this.AlertStatus = true;
      this.typeAlert = 'error';
      this.mensaje =
        'Rellene todos los campos para registrar un nuevo producto';
      this.url = '/addProduct';
      this.buttonText = 'Reintentar';
    }
  }

  // DELEGAR A API
  // calcularPreciosProductos() {
  //   const KwH =
  //     (Number(this.dataConst![this.lengthDC]?.consumoKw) / 1000 / 60) *
  //     Number(this.tiempo);

  //   const costoEnergia = KwH * this.dataConst![this.lengthDC]?.costokwH!;

  //   const costoFilamento =
  //     (Number(this.peso) * Number(this.dataConst![this.lengthDC]?.filamento)) /
  //     1000;
  //   const depreciacion =
  //     (Number(this.dataConst![this.lengthDC]?.costImpr) /
  //       Number(this.dataConst![this.lengthDC]?.vidaUtil) /
  //       60) *
  //     Number(this.tiempo);
  //   const merma =
  //     (Number(this.peso) *
  //       (Number(this.dataConst![this.lengthDC]?.merma) / 100) *
  //       Number(this.dataConst![this.lengthDC]?.filamento)) /
  //     1000;
  //   const ganancia =
  //     (costoEnergia + costoFilamento + depreciacion + merma) *
  //     (this.dataConst![this.lengthDC]?.ganan! / 100);
  //   const gastos = costoEnergia + costoFilamento + depreciacion + merma;

  //   let total = gastos + ganancia;

  //   if (total < 200) {
  //     return (this.product.precio = 200);
  //   } else {
  //     return (this.product.precio = this.redondear(total));
  //   }
  // }

  // DELEGAR A API

  // redondear(numero: number): number {
  //   const redondeo50 = Math.ceil(numero / 50) * 50;
  //   return redondeo50 % 100 === 0 ? redondeo50 : redondeo50;
  // }

  // DELEGAR A API
  // calcularTiempo() {
  //   this.tiempo = Number(this.horas) * 60 + Number(this.minutos);
  // }

  getData(dataForm: Products) {
    this.product.nombre = dataForm.nombre;
    this.product.descripcion = dataForm.descripcion;
    this.product.colores = dataForm.colores;
    this.product.precio = dataForm.precio;
    this.product.categoria = dataForm.categoria;
    this.product.imagenes = dataForm.imagenes;
    this.product.peso = dataForm.peso;
    this.product.horas = dataForm.horas;
    this.product.minutos = dataForm.minutos;
    this.product.alto = dataForm.alto;
    this.product.ancho = dataForm.ancho;
    this.product.grosor = dataForm.grosor;
    this.product.material = dataForm.material;
    console.log(dataForm.imagenes);
    this.addProduct();

    //DELEGAR A LA API
    // this.calcularTiempo();
    // this.product.precio = this.calcularPreciosProductos();
  }

  cleanFormUser() {
    // this.userAndPassword.password = ''; resetear datos si quiero limpiar
    this.AlertStatus = false;
  }
}
