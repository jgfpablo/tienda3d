import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../Interfaces/category.interface';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  category: Category = {
    nombre: '',
    imagenes: [],
  };

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
  }

  getDataForm(data: Category) {
    this.category = data;
    this.addCategory();
  }

  addCategory() {
    if (this.category.nombre != '') {
      this.storeService.addCategory(this.category).subscribe(
        () => {
          this.AlertStatus = true;
          this.typeAlert = 'success';
          this.mensaje = 'La creacion del nuevo producto fue exitosa';
          this.url = '/';
          this.buttonText = 'Dirigirme a inicio';
        },
        (error) => {
          this.AlertStatus = true;
          this.typeAlert = 'error';
          this.mensaje = error;
          this.url = '/addCategory';
          this.buttonText = 'Reintentar';
        }
      );
    } else {
      this.AlertStatus = true;
      this.typeAlert = 'error';
      this.mensaje =
        'Rellene todos los campos para registrar una nueva categoria';
      this.url = '/addCategory';
      this.buttonText = 'Reintentar';
    }
  }

  cleanForm() {
    //podria limpiar el form
    this.AlertStatus = false;
  }
}
