import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Products } from '../../Interfaces/products.interface';

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
  // price: string = '';
  id: number = 0;
  product: Partial<Products> = {};

  photo: number = 0;
  numberPhoto: number = 0;

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = Number(idParam);

    this.service.getDataById(this.id).subscribe((resp) => {
      this.product = resp.data;
      this.photo = resp.data.imagenes.length - 1;
      console.log(this.product);
    });
  }

  showImg(data: string) {
    if (this.numberPhoto == this.photo && data == '+') {
      this.numberPhoto = 0;
      console.log(this.numberPhoto);
    } else if (this.numberPhoto == 0 && data == '-') {
      this.numberPhoto = this.photo;
      console.log(this.numberPhoto);
    } else {
      this.numberPhoto += data === '+' ? 1 : -1;
      console.log(this.numberPhoto);
    }
  }

  showImgPhoto(number: number) {
    this.numberPhoto = number;
  }
}
