import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductComponent } from './product/product.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { AddConstantDataComponent } from './add-constant-data/add-constant-data.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  declarations: [ListProductsComponent, ProductComponent, AddProductComponent, HomePageComponent, AddConstantDataComponent, RegisterComponent, LoginComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    ComponentsModule,
    FormsModule,
  ],
})
export class StoreModule {}
