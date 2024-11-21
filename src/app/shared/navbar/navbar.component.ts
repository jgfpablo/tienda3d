import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Category } from '../../Interfaces/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private storeService: StoreService, private router: Router) {}

  categories: Category[] = [];
  open = false;
  openMobile = false;

  ngOnInit(): void {
    this.storeService.getCategoriaEliminadaObservable().subscribe(() => {
      this.cargarCategorias();
    });

    this.storeService.getCategorias().subscribe((resp) => {
      this.categories = resp;
    });
  }

  toggleMenu() {
    this.open = !this.open;
  }

  toggleMenuMobile() {
    this.openMobile = !this.openMobile;
    console.log(this.openMobile);
  }

  search(search: string) {
    this.router.navigate(['/search', search]);
  }

  getCategoryName(name: string) {
    const resultado = name.replace(/\s+/g, '');
    return resultado;
  }

  agregarEspacios(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').trim();
  }

  cargarCategorias() {
    this.storeService.getCategorias().subscribe((resp) => {
      this.categories = resp;
    });
  }
}
