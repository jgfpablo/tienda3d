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
  @Input() deleteButton: boolean = false;
  @Output() eventDelet = new EventEmitter();

  @Output() textTruncated = new EventEmitter<boolean>();

  limitarCaracteres(texto: string, limite: number): string {
    if (typeof texto !== 'string') {
      throw new Error('El argumento debe ser una cadena de texto.');
    }

    if (texto.length <= limite) {
      return texto;
    }

    return texto.slice(0, limite) + '...';
  }

  sendData() {
    this.eventDelet.emit(this.product?.nombre);
  }
}
