import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ConstData } from '../../Interfaces/const.interface';
import { Products } from '../../Interfaces/products.interface';

@Component({
  selector: 'app-card-products',
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss',
})
export class CardProductsComponent {
  @Input() product: Products | null = null;
  @Input() dataConst: ConstData | undefined;
  // @Input() productPrices: any;

  @Output() textTruncated = new EventEmitter<boolean>();

  description = false;

  toogleDescription(value: boolean) {
    this.description = value;
    this.textTruncated.emit(this.description);
  }
}
