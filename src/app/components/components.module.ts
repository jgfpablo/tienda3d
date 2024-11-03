import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductsComponent } from './card-products/card-products.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardProductsComponent, SearchComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [CardProductsComponent, SearchComponent],
})
export class ComponentsModule {}
