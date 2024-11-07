import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent {
  @Output() data = new EventEmitter();

  emitData() {
    this.data.emit();
  }
}
