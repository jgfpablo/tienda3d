import { Component, Input, SimpleChanges } from '@angular/core';
import { Products } from '../../Interfaces/products.interface';
import { ConstData } from '../../Interfaces/const.interface';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss',
})
export class CardProductsComponent {
  @Input() product: Products | null = null;
  @Input() dataConst: ConstData | undefined;
  @Input() productPrices: any;

  description = false;
}
