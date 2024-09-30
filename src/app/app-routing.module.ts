import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './store/list-products/list-products.component';
import { ProductComponent } from './store/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent,
    pathMatch: 'full',
  },

  { path: 'product/:price/:product.id', component: ProductComponent },
  { path: 'category/:category', component: ListProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}