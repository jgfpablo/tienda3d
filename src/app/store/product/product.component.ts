import { Component, SimpleChanges } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../Interfaces/products.interface';
import { Filament } from '../../Interfaces/filament.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(
    private service: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}
  name: string = '';

  product?: Products;

  photo: number = 0;
  numberPhoto: number = 0;

  filamentsAvaible: Filament[] = [];
  productLoaded = false;
  filamentsLoaded = false;

  filamentosDisponibles: string[] = [];

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name')!;

    this.service.getProductByName(this.name).subscribe((resp) => {
      this.product = resp[0];

      this.product.imagenes.reverse();

      this.photo = resp[0].imagenes?.length! - 1;

      this.productLoaded = true;

      if (this.productLoaded && this.filamentsLoaded) {
        this.verDisponibles();
      }
    });

    this.service.getFilaments().subscribe((resp) => {
      this.filamentsAvaible = resp;
      this.filamentsLoaded = true;

      if (this.productLoaded && this.filamentsLoaded) {
        this.verDisponibles();
      }
    });
  }

  verDisponibles() {
    if (
      this.product &&
      this.product.colores &&
      this.filamentsAvaible.length > 0
    ) {
      for (let color of this.product.colores) {
        // Iterar sobre los colores del producto
        for (let filament of this.filamentsAvaible) {
          // Iterar sobre los filamentos disponibles
          if (filament.color === color && filament.disponibilidad) {
            // Si el color coincide y el filamento está disponible, se agrega a la lista
            this.filamentosDisponibles.push(color);
            console.log(this.filamentosDisponibles);
          }
        }
      }

      console.log('Filamentos disponibles:', this.filamentosDisponibles);
    }
  }

  // showImg(data: string) {
  //   if (this.numberPhoto == this.photo && data == '+') {
  //     this.numberPhoto = 0;
  //     console.log(this.numberPhoto);
  //   } else if (this.numberPhoto == 0 && data == '-') {
  //     this.numberPhoto = this.photo;
  //     console.log(this.numberPhoto);
  //   } else {
  //     this.numberPhoto += data === '+' ? 1 : -1;
  //     console.log(this.numberPhoto);
  //   }
  // }

  showImgPhoto(number: number) {
    this.numberPhoto = number;
  }
}
