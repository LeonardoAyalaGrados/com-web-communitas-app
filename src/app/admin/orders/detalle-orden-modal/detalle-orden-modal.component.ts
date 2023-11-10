import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-orden-modal',
  templateUrl: './detalle-orden-modal.component.html',
  styleUrls: ['./detalle-orden-modal.component.css']
})
export class DetalleOrdenModalComponent implements OnInit{
  listVentaLibros:any[]=[];
  ventaLibroDetalle:any[]=[];
  
  ngOnInit(): void {
    this.buscarVentaLibroPorId();
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dataIdVentaOrden: { idVentaOrden: any, ventaLibros:any,usuarioOrden:any } ){
    console.log(dataIdVentaOrden.usuarioOrden);
  }

  buscarVentaLibroPorId(){
    this.listVentaLibros=this.dataIdVentaOrden.ventaLibros;

    const ventaDetalleLibroEncontrado=this.listVentaLibros.filter(venta=>venta.ordenVenta===this.dataIdVentaOrden.idVentaOrden);
    console.log(ventaDetalleLibroEncontrado);
    this.ventaLibroDetalle=ventaDetalleLibroEncontrado.flatMap(ventaLibro=>ventaLibro.libro);
   
    
  }

}
