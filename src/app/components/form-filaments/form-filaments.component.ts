import { Component, EventEmitter, Output } from '@angular/core';
import { Filament } from '../../Interfaces/filament.interface';

@Component({
  selector: 'app-form-filaments',
  templateUrl: './form-filaments.component.html',
  styleUrl: './form-filaments.component.scss',
})
export class FormFilamentsComponent {
  @Output() dataForm = new EventEmitter<Filament>();

  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];

  filament: Filament = {
    color: '',
    disponibilidad: true,
    // marca: '',
    imagenes: this.imagenes,
  };

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

  sendData() {
    this.dataForm.emit(this.filament);
  }
}
