import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  constructor(private storeService: StoreService) {}

  color: string = '';
  colores: string[] = [];
  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];
  // imgSize: any = '';

  product = {
    id: '0',
    nombre: '',
    peso: '',
    tiempo: '',
    descripcion: '',
    colores: this.colores,
    oferta: 'si',
    precio: 0,
    categoria: '',
    imagenes: this.imagenes,
  };

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

  addProduct(product: any) {
    this.storeService.addProduct(product).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
      }
    );
  }

  // capturarImagen(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     this.image = file;
  //   }
  // }

  guardarImagen(input: HTMLInputElement) {
    // const input = event.target as HTMLInputElement;
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
          // this.imgSize = this.calcularTamanoBase64(webpImage);
          // console.log(`Tamaño de la imagen WebP en Base64: ${this.imgSize} KB`);
          this.imageBase64 = webpImage;

          this.imagenes.push(this.imageBase64);
          // console.log(this.imagenes);
          this.imageBase64 = '';
        }
      };
    };
    reader.readAsDataURL(this.image); // Leer la imagen como URL
  }

  // calcularTamanoBase64(base64String: string): number {
  //   const sizeInBytes =
  //     (base64String.length * 3) / 4 -
  //     (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);
  //   const sizeInKB = sizeInBytes / 1024; // Convertir a KB
  //   return sizeInKB;
  // }
}
