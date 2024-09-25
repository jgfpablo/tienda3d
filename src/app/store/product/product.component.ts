import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private service: StoreService) {}

  ngOnInit(): void {
    this.service.getData().subscribe((data) => {
      console.log(data);
    });
  }
}
