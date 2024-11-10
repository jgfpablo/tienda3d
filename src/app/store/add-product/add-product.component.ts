import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ConstData } from '../../Interfaces/const.interface';
import { Category } from '../../Interfaces/category.interface';
import { AuthService } from '../../services/auth.service';
import { FormProduct, Products } from '../../Interfaces/products.interface';

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
  }

  horas: number = 0;
  minutos: number = 0;

  product: Products = {
    nombre: '',
    descripcion: '',
    colores: [],
    // oferta: 'si',
    precio: 5,
    categoria: '',
    imagenes: [],
  };

  tiempo: number = 0;
  peso: number = 0;

  addProduct() {
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
          this.url = '/';
          this.buttonText = 'Dirigirme a inicio';
        },
        (error) => {
          console.log(error);
          this.AlertStatus = true;
          this.typeAlert = 'error';
          this.mensaje = error;
          this.url = '/addProductCosas';
          this.buttonText = 'Reintentar';
        }
      );
    } else {
      this.AlertStatus = true;
      this.typeAlert = 'error';
      this.mensaje =
        'Rellene todos los campos para registrar un nuevo producto';
      this.url = '/addProductCosas';
      this.buttonText = 'Reintentar';
    }
  }

  calcularPreciosProductos() {
    const KwH =
      (Number(this.dataConst![this.lengthDC]?.consumoKw) / 1000 / 60) *
      Number(this.tiempo);

    const costoEnergia = KwH * this.dataConst![this.lengthDC]?.costokwH!;

    const costoFilamento =
      (Number(this.peso) * Number(this.dataConst![this.lengthDC]?.filamento)) /
      1000;
    const depreciacion =
      (Number(this.dataConst![this.lengthDC]?.costImpr) /
        Number(this.dataConst![this.lengthDC]?.vidaUtil) /
        60) *
      Number(this.tiempo);
    const merma =
      (Number(this.peso) *
        (Number(this.dataConst![this.lengthDC]?.merma) / 100) *
        Number(this.dataConst![this.lengthDC]?.filamento)) /
      1000;
    const ganancia =
      (costoEnergia + costoFilamento + depreciacion + merma) *
      (this.dataConst![this.lengthDC]?.ganan! / 100);
    const gastos = costoEnergia + costoFilamento + depreciacion + merma;

    let total = gastos + ganancia;

    if (total < 200) {
      return (this.product.precio = 200);
    } else {
      return (this.product.precio = this.redondear(total));
    }
  }

  redondear(numero: number): number {
    const redondeo50 = Math.ceil(numero / 50) * 50;
    return redondeo50 % 100 === 0 ? redondeo50 : redondeo50;
  }

  calcularTiempo() {
    this.tiempo = Number(this.horas) * 60 + Number(this.minutos);
  }

  getData(dataForm: FormProduct) {
    this.horas = dataForm.horas;
    this.minutos = dataForm.minutos;
    this.peso = dataForm.peso;
    this.calcularTiempo();
    this.product.nombre = dataForm.nombre;
    this.product.imagenes = dataForm.imagenes;
    this.product.precio = this.calcularPreciosProductos();
    this.product.descripcion = dataForm.descripcion;
    this.product.categoria = dataForm.categoria;
    this.addProduct();
  }

  cleanFormUser() {
    // this.userAndPassword.password = ''; resetear datos si quiero limpiar
    this.AlertStatus = false;
  }
}
