import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

import { ActivatedRoute } from '@angular/router';
import { Products } from '../../Interfaces/products.interface';
import { AuthService } from '../../services/auth.service';

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
  deleteButton: boolean = false;

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  isLoading: boolean = true;
  isDelayed: boolean = false;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productsList = [];

    this.activatedRoute.params.subscribe((params) => {
      this.isLoading = true;
      this.paginate = 0;
      this.category = params['category'];
      this.search = params['search'];
      this.loadProducts();
    });

    this.deleteButton = this.authService.isAuthenticated();
  }
  loadProducts(): void {
    if (this.category == 'allProducts') {
      this.storeService.Paginar(this.paginate, '').subscribe(
        (data) => {
          this.delayTimer();
          this.productsList = data.data;
          console.log('data: ' + data);
          console.log('productList: ' + this.productsList);

          this.isLoading = false;

          this.totalPages = Math.ceil(data.total / 6);
          this.paginacion = Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
          );
        },
        (error) => {
          console.error('Error al cargar productos:', error);
          this.isLoading = false;
          this.isDelayed = true;
        }
      );
    } else if (this.search) {
      this.storeService.getSearch(this.search, this.paginate).subscribe(
        (data) => {
          this.delayTimer();
          this.productsList = data.data;
          this.isLoading = false;

          this.totalPages = Math.ceil(data.total / 6);
          this.paginacion = Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
          );
        },
        (error) => {
          console.error('Error al cargar productos:', error);
          this.isLoading = false;
          this.isDelayed = true;
        }
      );
    } else {
      this.storeService.Paginar(this.paginate, this.category).subscribe(
        (data) => {
          this.delayTimer();

          this.productsList = data.data;
          this.isLoading = false;

          this.totalPages = Math.ceil(data.total / 6);
          this.paginacion = Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
          );
        },
        (error) => {
          console.error('Error al cargar productos:', error);
          this.isLoading = false;
          this.isDelayed = true;
        }
      );
    }
  }

  cambiarPagina(start: number) {
    this.paginate = start;
    this.loadProducts();
  }
  onChangeTruncated(truncated: boolean) {
    this.description = truncated;
  }

  deletProduct(product: string) {
    this.storeService.deletProduct(product).subscribe(() => {
      this.AlertStatus = true;
      this.typeAlert = 'success';
      this.mensaje = `Se elimino el producto ${product}`;
      this.url = '/category/allProducts';
      this.buttonText = 'ir a allProducts';
    });
  }

  delayTimer() {
    setTimeout(() => {
      if (this.isLoading) {
        this.isDelayed = true;
      }
    }, 5000);
  }

  cleanForm() {
    this.AlertStatus = false;
  }
}
