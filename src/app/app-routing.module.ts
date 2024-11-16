import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './store/list-products/list-products.component';
import { ProductComponent } from './store/product/product.component';
import { AddProductComponent } from './store/add-product/add-product.component';
import { HomePageComponent } from './store/home-page/home-page.component';
import { AddConstantDataComponent } from './store/add-constant-data/add-constant-data.component';
import { RegisterComponent } from './store/register/register.component';
import { LoginComponent } from './store/login/login.component';
import { authGuard } from './guard/auth.guard';
import { AddCategoryComponent } from './store/add-category/add-category.component';
import { DeleteCategoryComponent } from './store/delete-category/delete-category.component';
import { AddFilamentComponent } from './store/add-filament/add-filament.component';
import { DeleteFilamentComponent } from './store/delete-filament/delete-filament.component';
import { UpdateProductComponent } from './store/update-product/update-product.component';
import { UpdateFilamentComponent } from './store/update-filament/update-filament.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'AllProducts',
    component: ListProductsComponent,
  },
  { path: 'product/:name', component: ProductComponent },

  { path: 'search/:search', component: ListProductsComponent },

  { path: 'category/:category', component: ListProductsComponent },
  {
    path: 'addProduct',
    component: AddProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addConstantData',
    component: AddConstantDataComponent,
    canActivate: [authGuard],
  },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  {
    path: 'addCategory',
    component: AddCategoryComponent,
    canActivate: [authGuard],
  },

  {
    path: 'addFilament',
    component: AddFilamentComponent,
    canActivate: [authGuard],
  },

  { path: 'login', component: LoginComponent },

  {
    path: 'DeleteCategories',
    component: DeleteCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'DeleteFilament',
    component: DeleteFilamentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'UpdateProduct/:name',
    component: UpdateProductComponent,
    canActivate: [authGuard],
  },

  {
    path: 'UpdateFilaments',
    component: UpdateFilamentComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
