import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Categorias } from '../../Interfaces/products.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.getCategorias().subscribe((resp) => {
      this.categorias = resp.data.categorias; // Asigna la lista de categorías
    });
  }
  categorias: Categorias[] = [];
  open = false;
  toggleMenu() {
    this.open = !this.open;
  }

  getCategoryName(nombre: string) {
    const resultado = nombre.replace(/\s+/g, '');
    return resultado;
  }

  agregarEspacios(cadena: string): string {
    return cadena.replace(/([A-Z])/g, ' $1').trim();
  }
}
