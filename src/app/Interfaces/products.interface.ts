export interface Products {
  _id?: string;
  nombre: string;
  descripcion: string;
  colores: string[];
  precio: number;
  categoria: string;
  imagenes: string[];
  productId?: string;
  __v?: string;
}

export interface ProductsPaginate {
  message: string;
  status: string;
  total: number;
  data: Products[];
}
