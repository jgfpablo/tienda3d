import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Category } from '../../Interfaces/category.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.scss',
})
export class DeleteCategoryComponent {
  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();
    this.getCategories();
  }

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

  categorias: Category[] = [];

  categoria = 'seleccione una categoria';

  DeleteCategory() {
    if (this.categoria !== 'seleccione una categoria') {
      this.storeService.deleteCategory(this.categoria).subscribe(
        () => {
          this.AlertStatus = true;
          this.typeAlert = 'success';
          this.mensaje = `Se elimino la categoria ${this.categoria} `;
          this.url = '/DeleteCategories';
          this.buttonText = 'Continuar';
          this.getCategories();
        },
        (error) => {
          console.log(error);
          this.AlertStatus = true;
          this.typeAlert = 'error';
          this.mensaje = error.alert;
          this.url = '/DeleteCategories';
          this.buttonText = 'Continuar';
        }
      );
    } else {
      this.AlertStatus = true;
      this.typeAlert = 'error';
      this.mensaje =
        'no fue posible eliminar la categoria comunicate con Pablo. Es un tipaso';
      this.url = '/DeleteCategories';
      this.buttonText = 'Continuar';
    }
  }

  cleanFormUser() {
    this.AlertStatus = false;
  }

  getCategories() {
    this.storeService.getCategorias().subscribe((resp) => {
      this.categorias = resp;
    });
    this.categoria = 'seleccione una categoria';
  }
}
