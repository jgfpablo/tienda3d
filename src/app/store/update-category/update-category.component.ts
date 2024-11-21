import { Component } from '@angular/core';
import { Category } from '../../Interfaces/category.interface';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent {
  AlertStatus: boolean = false;
  typeAlert: string = '';
  mensaje: string = '';
  urlRedirect: string = '';
  buttonText: string = '';
  url: string = '';

  category: Category = {
    nombre: '',
    adicional: 0,
    imagenes: [],
  };

  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];

  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getTokenTimeLeft();

    this.storeService.getCategorias().subscribe((resp) => {
      this.categories = resp;
    });
  }

  cleanForm() {
    this.AlertStatus = false;
  }

  guardarImagen(input: HTMLInputElement) {
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.image = file;
    }

    if (!this.image) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(img, 0, 0);

          const webpImage = canvas.toDataURL('image/webp', 0.8);
          this.imageBase64 = webpImage;

          this.category.imagenes!.push(this.imageBase64);
          this.imageBase64 = '';
        }
      };
    };
    reader.readAsDataURL(this.image);
  }

  eliminarImagen(num: number) {
    this.category.imagenes!.splice(num, 1);
  }

  updateCategory() {
    if (this.category.nombre != '') {
      this.storeService.updateCategory(this.category).subscribe(
        () => {
          this.AlertStatus = true;
          this.typeAlert = 'success';
          this.mensaje = 'la actualizacion de categoria fue exitosa';
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
      this.mensaje = 'Rellene todos los campos para actualizar categoria';
      this.url = '/addCategory';
      this.buttonText = 'Reintentar';
    }
  }
}
