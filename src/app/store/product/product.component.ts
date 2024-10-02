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
  price: string = '';
  id: number = 0;
  product: Partial<Products> = {};

  ngOnInit(): void {
    this.price = this.activatedRoute.snapshot.paramMap.get('price')!;
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = Number(idParam);

    this.service.getDataById(this.id).subscribe((resp) => {
      this.product = resp.data;
      // console.log(this.product);
    });
  }
}
