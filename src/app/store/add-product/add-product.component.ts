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
    multiplicador: 1,
  };

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
          this.url = '/addProduct';
          this.buttonText = 'Continuar Agregando productos';
        },
        (error) => {
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
    this.product.multiplicador = dataForm.multiplicador;

    this.addProduct();
  }

  cleanFormUser() {
    this.AlertStatus = false;
  }
}
