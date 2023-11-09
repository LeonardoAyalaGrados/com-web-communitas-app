import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidosComponent } from '../pedidos.component';

@Component({
  selector: 'app-detalle-pedido-modal',
  templateUrl: './detalle-pedido-modal.component.html',
  styleUrls: ['./detalle-pedido-modal.component.css']
})
export class DetallePedidoModalComponent implements OnInit{
  listVentaLibros:any[]=[];
  ventaLibroDetalle:any[]=[];
  listOrdenesEncontradas:any[]=[];

  ngOnInit(): void {
    this.buscarVentaLibroPorId();
    
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dataIdVentaOrden: { idVentaOrden: any, ventaLibros:any },public dialogo: MatDialogRef<PedidosComponent>){
  }

  buscarVentaLibroPorId(){
    this.listVentaLibros=this.dataIdVentaOrden.ventaLibros;

    const ventaDetalleLibroEncontrado=this.listVentaLibros.filter(venta=>venta.ordenVenta===this.dataIdVentaOrden.idVentaOrden);
    console.log(ventaDetalleLibroEncontrado);
    this.ventaLibroDetalle=ventaDetalleLibroEncontrado.flatMap(ventaLibro=>ventaLibro.libro);
   
    
  }

}
