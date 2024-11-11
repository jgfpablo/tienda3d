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

  description: boolean = false;

  toogleDescription(value: boolean) {
    this.description = value;
    this.textTruncated.emit(this.description);
  }

  limitarCaracteres(texto: string, limite: number): string {
    if (typeof texto !== 'string') {
      throw new Error('El argumento debe ser una cadena de texto.');
    }

    if (texto.length <= limite) {
      return texto; // Devuelve el texto original si es más corto que el límite
    }

    return texto.slice(0, limite) + '...'; // Corta el texto y añade "..."
  }

  sendData() {
    this.eventDelet.emit(this.product?.nombre);
  }
}
