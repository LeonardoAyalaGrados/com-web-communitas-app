import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentaLibroService } from 'src/app/services/venta-libro.service';
import { VentaOrdenService } from 'src/app/services/venta-orden.service';
import { DetalleOrdenModalComponent } from './detalle-orden-modal/detalle-orden-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  dataUsuario:any;
  listVentaOrden:any[]=[];
  listVentaLibros:any[]=[];
  isplayedColumns: string[] = ['idVentaOrden', 'total', 'estado', 'tipoEntrega','creadoEn','distrito','idUsuario','usuario','celular','correo','actions'];
  
  
  ngOnInit(): void {
    this.listVentaOrdenUsers();
    this.listVentaLibroTotal();
  }

  constructor(public dialogo: MatDialog,private ventaOrdenServices:VentaOrdenService, private ventaLibroServices:VentaLibroService){
  }

  listVentaOrdenUsers(){
    this.ventaOrdenServices.listVentaOrdenConUsuario().subscribe(
      (data)=>{
        this.listVentaOrden=data;
        this.dataUsuario=this.listVentaOrden.flatMap(orden=>orden.usuario);
          console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    );}
    
    modalDetallePedido(idVentaOrden:any){
      console.log(idVentaOrden);
      const ventaLibros=this.listVentaLibros;
      const usuarioOrden=this.dataUsuario;
    
    this.dialogo
      .open(DetalleOrdenModalComponent, {
        data: {idVentaOrden, ventaLibros,usuarioOrden}
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
        }
        
      });
    }

    listVentaLibroTotal(){
      this.ventaLibroServices.listVentaLibro().subscribe(
        (data)=>{
          this.listVentaLibros=data;
          console.log(data)
        },
        (error)=>{
          console.log(error);

        }
      );
    }

    editarEstado(idVentaOrden:any){}
}
