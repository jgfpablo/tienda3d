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

export interface FormProduct {
  categoria: string;
  colores: string[];
  descripcion: string;
  horas: string;
  imagenes: string[]; // Si las imágenes son Base64, puede usarse 'string[]', si son objetos, cámbialo al tipo adecuado
  minutos: string;
  nombre: string;
  oferta: string; // Considera un booleano si solo puede ser "si" o "no"
  peso: string;
  precio: number;
}
