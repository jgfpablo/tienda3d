import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductsComponent } from './card-products/card-products.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { FormCategoryComponent } from './form-category/form-category.component';
import { FormProductComponent } from './form-product/form-product.component';
import { AlertComponent } from './alert/alert.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    CardProductsComponent,
    SearchComponent,
    ErrorAlertComponent,
    SuccessAlertComponent,
    FormCategoryComponent,
    FormProductComponent,
    AlertComponent,
    UserFormComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    CardProductsComponent,
    SearchComponent,
    SuccessAlertComponent,
    ErrorAlertComponent,
    AlertComponent,
    FormProductComponent,
    FormCategoryComponent,
    UserFormComponent,
  ],
})
export class ComponentsModule {}
