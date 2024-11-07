import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Category } from '../../Interfaces/category.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private storeService: StoreService, private router: Router) {}

  categories: Category[] = [];
  open = false;
  ngOnInit(): void {
    this.storeService.getCategorias().subscribe((resp) => {
      this.categories = resp;
    });
  }

  toggleMenu() {
    this.open = !this.open;
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
}
