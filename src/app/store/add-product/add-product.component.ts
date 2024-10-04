import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ConstData } from '../../Interfaces/const.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getDataConst().subscribe((data) => {
      this.dataConst = data.data;
    });
  }

  dataConst: ConstData | undefined;

  color: string = '';
  colores: string[] = [];
  horas: number = 0;
  minutos: number = 0;
  image: any = undefined;
  imageBase64: string = '';
  imagenes: string[] = [];
  // imgSize: any = '';

  product = {
    id: '0',
    nombre: '',
    peso: 0,
    tiempo: 0,
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

  addProduct() {
    this.calcularPreciosProductos();
    this.calcularTiempo();
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

  calcularPreciosProductos() {
    const KwH =
      (Number(this.dataConst?.consumoKw) / 1000 / 60) *
      Number(this.product.tiempo);
    const costoEnergia = KwH * this.dataConst?.costokwH!;
    const costoFilamento =
      (Number(this.product?.peso) * Number(this.dataConst?.filamento)) / 1000;
    const depreciacion =
      (Number(this.dataConst?.costImpr) /
        Number(this.dataConst?.vidaUtil) /
        60) *
      Number(this.product?.tiempo);
    const merma =
      (Number(this.product?.peso) *
        (Number(this.dataConst?.merma) / 100) *
        Number(this.dataConst?.filamento)) /
      1000;
    const ganancia =
      (costoEnergia + costoFilamento + depreciacion + merma) *
      (this.dataConst?.ganan! / 100);
    const gastos = costoEnergia + costoFilamento + depreciacion + merma;

    let total = gastos + ganancia;

    if (total < 200) {
      this.product.precio = 200;
    } else {
      this.product.precio = this.redondear(total);
    }

    // console.log('KWH = ' + KwH);
    // console.log('Costo Energia = ' + costoEnergia);
    // console.log('Costo Filamento = ' + costoFilamento);
    // console.log('depreciacion = ' + depreciacion);
    // console.log('merma = ' + merma);
    // console.log('ganancia = ' + ganancia);
    // console.log('gastos = ' + gastos);
    // console.log('total = ' + total);
  }

  redondear(numero: number): number {
    const redondeo50 = Math.ceil(numero / 50) * 50;
    return redondeo50 % 100 === 0 ? redondeo50 : redondeo50;
  }

  calcularTiempo() {
    this.product.tiempo = Number(this.horas) * 60 + Number(this.minutos);
  }
}
