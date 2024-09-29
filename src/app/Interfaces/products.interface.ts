export interface Products {
  message: string;
  status: string;
  data: Products[];
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
}

export enum Colors {
  Azul = 'azul',
  Rojo = 'rojo',
  Verde = 'verde',
}
