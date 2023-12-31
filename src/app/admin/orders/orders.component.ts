import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentaLibroService } from 'src/app/services/venta-libro.service';
import { VentaOrdenService } from 'src/app/services/venta-orden.service';
import { DetalleOrdenModalComponent } from './detalle-orden-modal/detalle-orden-modal.component';
import { CambiarEstadoModalComponent } from './cambiar-estado-modal/cambiar-estado-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy{
  dataUsuario:any;
  subcrip:Subscription;
  listVentaOrden:any[]=[];
  listVentaLibros:any[]=[];
  isplayedColumns: string[] = ['idVentaOrden', 'total', 'estado', 'tipoEntrega','creadoEn','distrito','direccion','idUsuario','usuario','celular','correo','actions'];
  
  
  ngOnInit(): void {
    this.listVentaOrdenUsers();

    //Utizamos subject para poder emitir eventos
    this.subcrip=this.ventaOrdenServices.refresh$.subscribe(()=>{
      this.listVentaOrdenUsers();
      console.log("evento");
    });
    this.listVentaLibroTotal();
  }

  constructor(public dialogo: MatDialog,private ventaOrdenServices:VentaOrdenService, private ventaLibroServices:VentaLibroService){
  }
  ngOnDestroy(): void {
   this.subcrip.unsubscribe();
  }

  listVentaOrdenUsers(){
    this.ventaOrdenServices.listVentaOrdenConUsuario().subscribe(
      (data)=>{
        this.listVentaOrden=data;
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

    editarEstadoModal(idVentaOrden:any){
      const ventaOrdenes=this.listVentaOrden;
      console.log(ventaOrdenes);
      this.dialogo
      .open(CambiarEstadoModalComponent, {
        data: {idVentaOrden,ventaOrdenes}
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
        }
        
      });
    }

    getColorPorEstado(estado: string): { [key: string]: string } {
      switch (estado) {
        case 'PENDIENTE':
          return { color: 'red' };
        case 'EN_PROCESO':
          return { color: 'blue' };
        case 'ATENDIDO':
          return { color: 'green' };
        default:
          return {};
      }
    }
}
