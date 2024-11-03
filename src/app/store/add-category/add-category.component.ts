import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];

  category = {
    nombre: '',
    imagenes: this.imagenes,
  };

  constructor(private storeService: StoreService) {}

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

          this.imagenes.push(this.imageBase64);
          this.imageBase64 = '';
        }
      };
    };
    reader.readAsDataURL(this.image); // Leer la imagen como URL
  }

  eliminarImagen(num: number) {
    this.imagenes.splice(num, 1);
  }

  addCategory() {
    this.storeService.addCategory(this.category).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
      }
    );
  }
}
