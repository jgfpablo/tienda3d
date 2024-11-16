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
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { AddFilamentComponent } from './add-filament/add-filament.component';
import { DeleteFilamentComponent } from './delete-filament/delete-filament.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateFilamentComponent } from './update-filament/update-filament.component';

@NgModule({
  declarations: [
    ListProductsComponent,
    ProductComponent,
    AddProductComponent,
    HomePageComponent,
    AddConstantDataComponent,
    RegisterComponent,
    LoginComponent,
    AddCategoryComponent,
    DeleteCategoryComponent,
    AddFilamentComponent,
    DeleteFilamentComponent,
    UpdateProductComponent,
    UpdateFilamentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    ComponentsModule,
    FormsModule,
  ],
})
export class StoreModule {}
