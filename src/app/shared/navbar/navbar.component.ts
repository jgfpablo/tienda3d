import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private storeService: StoreService) {}

  open = false;

  category = 'llaveros';
  toggleMenu() {
    this.open = !this.open;
  }
}
