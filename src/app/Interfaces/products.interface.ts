export interface Products {
  message: string;
  status: string;
  data: Products[];
}

export interface Products {
  nombre: string;
  peso: number;
  tiempo: number;
  descripcion: string;
  colores: Colors[];
}

export enum Colors {
  Azul = 'azul',
  Rojo = 'rojo',
  Verde = 'verde',
}
