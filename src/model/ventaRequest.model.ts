// venta-request.model.ts
export interface VentaRequest {
    idUsuario: number;
    tipoDeEntrega: string;
    librosSeleccionados: any[];
  }
  
  export interface Libro {
    idLibro: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock: number;
    autor: string;
    tapa: string;
    creadoEn: string;
    actualizadoEn: string | null;
    paginas: number;
    anio: number;
  }
  
  export enum TipoEntrega {
    ENTREGA_DOMICILIO = 'ENTREGA_DOMICILIO',
    RECOJO_TIENDA = 'RECOJO_TIENDA',
  }
  
  export enum TipoTapa {
    TAPA_DURA = 'TAPA_DURA',
    RÚSTICA = 'RUSTICA',
    GRAPAS='GRAPAS',
    BLANDA='BLANDAS'
    
    // Otros tipos de tapa si los tienes
  }