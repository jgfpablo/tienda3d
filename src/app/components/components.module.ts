import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductsComponent } from './card-products/card-products.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

import { FormCategoryComponent } from './form-category/form-category.component';
import { FormProductComponent } from './form-product/form-product.component';
import { AlertComponent } from './alert/alert.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    CardProductsComponent,
    SearchComponent,
    FormCategoryComponent,
    FormProductComponent,
    AlertComponent,
    UserFormComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    CardProductsComponent,
    SearchComponent,
    AlertComponent,
    FormProductComponent,
    FormCategoryComponent,
    UserFormComponent,
  ],
})
export class ComponentsModule {}
