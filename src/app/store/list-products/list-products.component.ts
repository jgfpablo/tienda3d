import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

import { ActivatedRoute } from '@angular/router';
import { Products } from '../../Interfaces/products.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  productsList: Products[] = [];
  description = false;
  category: string = '';
  search: string = '';

  paginate = 0;

  totalPages = 0;
  paginacion: number[] = [];

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.paginate = 0;
      this.category = params['category'];
      this.search = params['search'];
      this.loadProducts();
    });
  }
  loadProducts(): void {
    if (this.category == 'allProducts') {
      this.storeService.Paginar(this.paginate, '').subscribe((data) => {
        this.productsList = data.data;
        this.totalPages = Math.ceil(data.total / 6);
        this.paginacion = Array.from(
          { length: this.totalPages },
          (_, index) => index + 1
        );
      });
    } else if (this.search) {
      this.storeService
        .getSearch(this.search, this.paginate)
        .subscribe((data) => {
          console.log(data.data);
          this.productsList = data.data;
          this.totalPages = Math.ceil(data.total / 6);
          this.paginacion = Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
          );
        });
    } else {
      this.storeService
        .Paginar(this.paginate, this.category)
        .subscribe((data) => {
          this.productsList = data.data;
          this.totalPages = Math.ceil(data.total / 6);
          this.paginacion = Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
          );
        });
    }
  }

  cambiarPagina(start: number) {
    this.paginate = start;
    this.loadProducts();
  }
  onChangeTruncated(truncated: boolean) {
    this.description = truncated;
  }
}
