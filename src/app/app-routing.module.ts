import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './store/list-products/list-products.component';
import { ProductComponent } from './store/product/product.component';
import { AddProductComponent } from './store/add-product/add-product.component';
import { HomePageComponent } from './store/home-page/home-page.component';

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
  { path: 'category/:category', component: ListProductsComponent },

  { path: 'addProductCosas', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
