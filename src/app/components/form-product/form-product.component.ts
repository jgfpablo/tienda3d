import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Category } from '../../Interfaces/category.interface';
import { Filament } from '../../Interfaces/filament.interface';
import { Products } from '../../Interfaces/products.interface';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent {
  @Output() data = new EventEmitter();
  @Input() categorias: Category[] = [];
  @Input() colores: Filament[] = [];
  @Input() product: Products = {
    nombre: '',
    descripcion: '',
    colores: [],
    precio: 0,
    categoria: '',
    imagenes: [],
    peso: 0,
    horas: 0,
    minutos: 0,
    alto: '',
    ancho: '',
    grosor: '',
    material: '',
    multiplicador: 1,
  };

  ngOnChanges(changes: SimpleChanges): void {
    //separar el tamano (ancho alto grosor) por el espacio separandolo en los tipos de medida
    if (this.product.nombre != '') {
      this.dataForm = this.product;
      console.log(this.product);
    }
    this.dataForm.alto = String(this.dataForm.alto).replace(/ .*/, '');
    this.dataForm.ancho = String(this.dataForm.ancho).replace(/ .*/, '');
    this.dataForm.grosor = String(this.dataForm.grosor).replace(/ .*/, '');

    this.categoria = this.dataForm.categoria;
    this.coloresDisponibles = this.dataForm.colores;
    this.dataForm.material = this.product.material;
    if (this.product) {
      this.imagenes = this.product.imagenes;
    }
  }

  categoria = 'Llaveros';

  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];

  color: string = 'seleccione un color';
  coloresDisponibles: string[] = [];
  medidaAlto: string = 'mm';
  medidaAncho: string = 'mm';
  medidaGrosor: string = 'mm';

  dataForm: Products = {
    nombre: '',
    descripcion: '',
    categoria: this.categoria,
    imagenes: this.imagenes,
    horas: 0,
    minutos: 0,
    peso: 0,
    precio: 0,
    colores: this.coloresDisponibles,
    alto: '',
    ancho: '',
    grosor: '',
    material: 'Plastico',
    multiplicador: 1,
  };

  // emitData() {
  //   this.data.emit();
  // }

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
    console.log(this.imagenes);
  }

  quitarColor(num: number) {
    this.coloresDisponibles.splice(num, 1);
  }

  agregarColor() {
    if (
      this.color != 'seleccione un color' &&
      !this.coloresDisponibles.includes(this.color)
    ) {
      this.coloresDisponibles.push(this.color);
    }
    // this.color = '';
  }

  eliminarImagen(num: number) {
    this.imagenes.splice(num, 1);
  }

  sendDataForm() {
    this.dataForm.alto = this.dataForm.alto + ' ' + this.medidaAlto;
    this.dataForm.ancho = this.dataForm.ancho + ' ' + this.medidaAncho;
    this.dataForm.grosor = this.dataForm.grosor + ' ' + this.medidaGrosor;
    this.dataForm.categoria = this.categoria;
    this.dataForm.imagenes = this.imagenes;
    this.data.emit(this.dataForm);
  }
}
