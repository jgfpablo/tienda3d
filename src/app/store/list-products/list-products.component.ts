import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Products } from '../../Interfaces/products.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  dataProducts: Products[] = [];
  dataConst: any = 'x';

  constructor(private storeService: StoreService) {
    storeService.getData().subscribe((data) => {
      this.dataProducts = data.data;
      console.log(this.dataProducts);
    });

    storeService.getDataConst().subscribe((data) => {
      this.dataConst = data.data;
      console.log(this.dataConst);
    });
  }
}
