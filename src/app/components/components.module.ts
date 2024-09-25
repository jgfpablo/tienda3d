import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductsComponent } from './card-products/card-products.component';

@NgModule({
  declarations: [CardProductsComponent],
  imports: [CommonModule],
  exports: [CardProductsComponent],
})
export class ComponentsModule {}
