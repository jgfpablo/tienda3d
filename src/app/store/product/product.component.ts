import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../Interfaces/products.interface';

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

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name')!;

    this.service.getProductByName(this.name).subscribe((resp) => {
      this.product = resp[0];
      this.photo = resp[0].imagenes?.length! - 1;
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
