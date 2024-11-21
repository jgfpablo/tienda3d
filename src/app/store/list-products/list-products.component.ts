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
  deleteButton: boolean = false;

  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  isLoading: boolean = true;
  isDelayed: boolean = false;

  paginate = 1;
  totalPages = 0;
  paginacion: number[] = [];

  paginaActual = 1;

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
          this.isLoading = false;
          this.totalPages = Math.ceil(data.total / 6);
          this.paginacion = Array.from(
            { length: this.totalPages },
            (_, index) => index + 1
          );

          this.generatePagination(this.paginate, this.totalPages);
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

          this.generatePagination(this.paginate, this.totalPages);
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
          this.generatePagination(this.paginate, this.totalPages);
        },
        (error) => {
          console.error('Error al cargar productos:', error);
          this.isLoading = false;
          this.isDelayed = true;
        }
      );
    }
  }

  cambiarPagina(item: number) {
    this.paginaActual = item;
    this.paginate = item;
    this.isLoading = true;
    this.productsList = [];
    this.loadProducts();
    this.scrollToTop();
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  generatePagination(paginate: number, totalPages: number, maxVisible = 6) {
    const pages = [];
    const half = Math.floor((maxVisible - 2) / 2);

    let start = Math.max(2, paginate - half);
    let end = Math.min(totalPages - 2, paginate + half);

    if (paginate <= half + 1) {
      end = Math.min(totalPages - 1, maxVisible - 1);
    } else if (paginate + half >= totalPages) {
      start = Math.max(2, totalPages - maxVisible + 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (totalPages > 1) {
      this.paginacion = [1, ...pages, totalPages - 1];
    } else {
      this.paginacion = [1];
    }
  }
}
