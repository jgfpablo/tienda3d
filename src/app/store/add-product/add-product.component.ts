import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ConstData } from '../../Interfaces/const.interface';
import { Category } from '../../Interfaces/category.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  constructor(private storeService: StoreService) {}

  categorias: Category[] = [];

  dataConst: ConstData[] | undefined;
  lengthDC: number = 0;

  ngOnInit(): void {
    this.storeService.getDataConst().subscribe((data) => {
      // this.dataConst = data;
      this.dataConst = data;

      this.lengthDC = data.length - 1;
    });
    this.storeService.getCategorias().subscribe((resp) => {
      this.categorias = resp;
    });
  }

  categoria = 'Llaveros';
  color: string = '';
  colores: string[] = [];
  horas: number = 0;
  minutos: number = 0;
  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];

  product = {
    nombre: '',
    descripcion: '',
    colores: this.colores,
    oferta: 'si',
    precio: 5,
    categoria: '',
    imagenes: this.imagenes,
  };

  tiempo: number = 0;
  peso: number = 0;

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

  addProduct() {
    this.product.categoria = this.categoria;
    this.calcularTiempo();
    this.calcularPreciosProductos();
    this.storeService.addProduct(this.product).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
      }
    );
  }

  guardarImagen(input: HTMLInputElement) {
    this.calcularTiempo();
    this.calcularPreciosProductos();
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

  calcularPreciosProductos() {
    console.log(this.dataConst![this.lengthDC]);
    const KwH =
      (Number(this.dataConst![this.lengthDC]?.consumoKw) / 1000 / 60) *
      Number(this.tiempo);

    console.log(this.tiempo);
    console.log(KwH + 'kwh -----------');
    const costoEnergia = KwH * this.dataConst![this.lengthDC]?.costokwH!;

    const costoFilamento =
      (Number(this.peso) * Number(this.dataConst![this.lengthDC]?.filamento)) /
      1000;
    const depreciacion =
      (Number(this.dataConst![this.lengthDC]?.costImpr) /
        Number(this.dataConst![this.lengthDC]?.vidaUtil) /
        60) *
      Number(this.tiempo);
    const merma =
      (Number(this.peso) *
        (Number(this.dataConst![this.lengthDC]?.merma) / 100) *
        Number(this.dataConst![this.lengthDC]?.filamento)) /
      1000;
    const ganancia =
      (costoEnergia + costoFilamento + depreciacion + merma) *
      (this.dataConst![this.lengthDC]?.ganan! / 100);
    const gastos = costoEnergia + costoFilamento + depreciacion + merma;

    let total = gastos + ganancia;
    console.log(total);

    if (total < 200) {
      this.product.precio = 200;
    } else {
      this.product.precio = this.redondear(total);
    }
  }

  redondear(numero: number): number {
    const redondeo50 = Math.ceil(numero / 50) * 50;
    return redondeo50 % 100 === 0 ? redondeo50 : redondeo50;
  }

  calcularTiempo() {
    this.tiempo = Number(this.horas) * 60 + Number(this.minutos);
  }
}
