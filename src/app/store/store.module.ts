import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductComponent } from './product/product.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListProductsComponent, ProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    ComponentsModule,
    FormsModule,
  ],
})
export class StoreModule {}
