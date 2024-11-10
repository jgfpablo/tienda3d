import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Category } from '../../Interfaces/category.interface';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent {
  @Output() data = new EventEmitter();
  @Input() categorias: Category[] = [];
  categoria = 'Llaveros';

  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];

  color: string = '';
  colores: string[] = [];
  horas: number = 0;
  minutos: number = 0;
  peso: number = 0;

  dataForm = {
    nombre: '',
    descripcion: '',
    categoria: this.categoria,
    imagenes: this.imagenes,
    horas: 0,
    minutos: 0,
    peso: 0,
  };

  emitData() {
    this.data.emit();
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

          this.imagenes.push(this.imageBase64);
          this.imageBase64 = '';
        }
      };
    };
    reader.readAsDataURL(this.image); // Leer la imagen como URL
  }

  quitarColor(num: number) {
    this.colores.splice(num, 1);
  }

  agregarColor() {
    this.colores.push(this.color);
    this.color = '';
  }

  eliminarImagen(num: number) {
    this.imagenes.splice(num, 1);
  }

  sendDataForm() {
    this.dataForm.categoria = this.categoria;
    this.data.emit(this.dataForm);
  }
}
