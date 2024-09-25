import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductComponent } from './product/product.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [ListProductsComponent, ProductComponent],
  imports: [CommonModule, RouterModule, RouterLink, ComponentsModule],
})
export class StoreModule {}
