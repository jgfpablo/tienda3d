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
    path: 'addProductCosas',
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

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
