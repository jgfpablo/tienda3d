import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../Interfaces/products.interface';

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
  };

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name')!;
    this.storeService.getProductByName(this.name).subscribe((resp) => {
      this.product = resp[0];
    });
  }

  getData(dataForm: Products) {
    this.product = dataForm;
  }

  cleanFormUser() {
    //podes limpiar form
    this.AlertStatus = false;
  }
}
