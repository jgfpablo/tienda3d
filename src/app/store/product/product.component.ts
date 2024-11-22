import { Component } from '@angular/core';
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

  isLoading: boolean = true;
  isDelayed: boolean = true;

  ngOnInit(): void {
    this.isLoading = true;
    this.name = this.activatedRoute.snapshot.paramMap.get('name')!;

    this.service.getProductByName(this.name).subscribe((resp) => {
      this.product = resp[0];
      this.isLoading = false;

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
        for (let filament of this.filamentsAvaible) {
          if (filament.color === color && filament.disponibilidad) {
            this.filamentosDisponibles.push(color);
          }
        }
      }
    }
  }

  showImgPhoto(number: number) {
    this.numberPhoto = number;
  }
}
