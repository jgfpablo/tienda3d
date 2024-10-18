import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ConstData } from '../../Interfaces/const.interface';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../Interfaces/products.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  productsList: Products[] = [];
  dataConst: ConstData | undefined;

  description = false;
  paginate = 0;
  listPaginacion: number[] = [];
  category: string = ''; // Variable para la categoría

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.category = params['category'];
      this.loadProducts();
    });
  }
  loadProducts(): void {
    this.listPaginacion = [];
    this.paginate = 0;
    if (!this.category) {
      this.storeService.Paginar(0).subscribe((data) => {
        this.handleProductResponse(data);
        console.log(data);
      });
    } else {
      this.storeService.Paginar(0, this.category).subscribe((data) => {
        this.handleProductResponse(data);
        console.log(data);
      });
    }
  }

  handleProductResponse(data: any): void {
    this.productsList = data.data;
    for (let index = 0; index < data.total / 6; index++) {
      this.listPaginacion[index] = index;
    }
  }

  paginacion(paginate: number) {
    this.storeService.Paginar(paginate * 6, this.category).subscribe((data) => {
      this.handleProductResponse(data);
      this.paginate = paginate;
    });
  }

  onChangeTruncated(truncated: boolean) {
    this.description = truncated;
    console.log(this.description);
  }
}
