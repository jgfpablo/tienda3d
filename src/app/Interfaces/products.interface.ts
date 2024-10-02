export interface ProductResponse {
  message: string;
  status: string;
  data: Products; // Aquí 'Products' debe ser tu interfaz de producto
}

export interface Products {
  id: number;
  nombre: string;
  peso: number;
  tiempo: number;
  descripcion: string;
  colores: Colors[];
  oferta: number;
  precio: number;
  categoria: string;
  imagenes: string[];
}

export enum Colors {
  Azul = 'azul',
  Rojo = 'rojo',
  Verde = 'verde',
}

export interface Product {
  id: number;
  nombre: string;
  peso: number;
  tiempo: number;
  descripcion: string;
  colores: Colors[];
  oferta: number;
  precio: number;
  categoria: string;
  imagenes: string[];
}
