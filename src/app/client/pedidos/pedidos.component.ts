import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalleLibroModalComponent } from 'src/app/home/detalle-libro-modal/detalle-libro-modal.component';
import { UserServicesService } from 'src/app/services/user-services.service';
import { VentaOrdenService } from 'src/app/services/venta-orden.service';
import { DetallePedidoModalComponent } from './detalle-pedido-modal/detalle-pedido-modal.component';
import { VentaLibroService } from 'src/app/services/venta-libro.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  listVentaLibros:any[]=[];
  listOrdenes:any[];
  displayedColumns: string[] = ['idVentaOrden', 'total', 'estado', 'tipoEntrega','creadoEn','actions'];
  constructor(private userServices:UserServicesService, public dialogo: MatDialog, private ventaLibroServices:VentaLibroService){}

  ngOnInit(): void {
   this.listarOrdenesActualizadoUser();
   this.listVentaLibroTotal();
  }

  listarOrdenesActualizadoUser(){
    const idUsuario=this.userServices.getUser().idUsuario;
    this.userServices.findById(idUsuario).subscribe(
      (data)=>{
         this.listOrdenes=data.ordenes;
         console.log(this.listOrdenes);
      },
      (error)=>{
          console.log(error);
      }
    )};

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

  modalDetallePedido(idVentaOrden:any){
    console.log(idVentaOrden);
    const ventaLibros=this.listVentaLibros;
    
    this.dialogo
      .open(DetallePedidoModalComponent, {
        data: {idVentaOrden, ventaLibros}
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
        }
        
      });
  }


}
