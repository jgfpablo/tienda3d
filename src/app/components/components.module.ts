import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductsComponent } from './card-products/card-products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardProductsComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardProductsComponent],
})
export class ComponentsModule {}
