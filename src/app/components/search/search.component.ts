import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  data: string = '';

  buscar() {
    this.search.emit(this.data);
    this.data = '';
  }
}
