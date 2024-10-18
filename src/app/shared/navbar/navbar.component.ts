import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Category } from '../../Interfaces/category.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private storeService: StoreService) {}

  categories: Category[] = [];
  open = false;
  ngOnInit(): void {
    this.storeService.getCategorias().subscribe((resp) => {
      this.categories = resp;
      console.log(this.categories);
    });
  }

  toggleMenu() {
    this.open = !this.open;
  }

  getCategoryName(name: string) {
    const resultado = name.replace(/\s+/g, '');
    return resultado;
  }

  agregarEspacios(name: string): string {
    return name.replace(/([A-Z])/g, ' $1').trim();
  }
}
