import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../Interfaces/products.interface';
import { Filament } from '../../Interfaces/filament.interface';
import { Category } from '../../Interfaces/category.interface';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  name: string = '';

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

  colores: Filament[] = [];
  categorias: Category[] = [];

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
    this.name = this.activatedRoute.snapshot.paramMap.get('name')!;
    this.storeService.getProductByName(this.name).subscribe((resp) => {
      this.product = resp[0];
    });

    this.storeService.getFilaments().subscribe((resp) => {
      this.colores = resp;
    });
    this.storeService.getCategorias().subscribe((resp) => {
      this.categorias = resp;
    });
  }

  getData(dataForm: Products) {
    this.product = dataForm;

    //----------------
    this.storeService.updateProduct(this.product, this.name).subscribe(
      (resp: any) => {
        console.log(resp);
        this.AlertStatus = true;
        this.typeAlert = 'success';
        this.mensaje = `El producto fue actualizado con exito ${resp.data}`;
        this.url = `/product/${resp.data}`;
        this.buttonText = 'Ver producto';
      },
      (resp) => {
        this.AlertStatus = true;
        this.typeAlert = 'error';
        this.mensaje = resp.error;
        this.url = `/UpdateProduct/:${resp.data}`;
        this.buttonText = 'Reintentar';
      }
    );
  }

  cleanFormUser() {
    //podes limpiar form
    this.AlertStatus = false;
  }
}
