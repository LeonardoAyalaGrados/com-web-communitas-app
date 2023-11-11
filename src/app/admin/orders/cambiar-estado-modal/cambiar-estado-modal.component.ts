import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaOrdenService } from 'src/app/services/venta-orden.service';

@Component({
  selector: 'app-cambiar-estado-modal',
  templateUrl: './cambiar-estado-modal.component.html',
  styleUrls: ['./cambiar-estado-modal.component.css']
})
export class CambiarEstadoModalComponent implements OnInit {
  ventaOrdenes:any[]=[];
  form:FormGroup;
  ventaOrden:any;
  constructor(private snackBar:MatSnackBar,@Inject(MAT_DIALOG_DATA) public dataIdVentaOrden: { idVentaOrden: any, ventaOrdenes:any}, private fb:FormBuilder, private ventaOrdenServices:VentaOrdenService,public dialogo: MatDialogRef<CambiarEstadoModalComponent>){
    this.form=this.fb.group({
      estado: ['',Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.buscarVentaOrdenPorId();
  }

  buscarVentaOrdenPorId(){
    this.ventaOrdenes=this.dataIdVentaOrden.ventaOrdenes;
    this.ventaOrden=this.ventaOrdenes.find(orden=>orden.idVentaOrden==this.dataIdVentaOrden.idVentaOrden);
    console.log(this.ventaOrden);
    console.log(this.ventaOrden.estado);
    this.form.patchValue({
      estado:this.ventaOrden.estado
    });
  }

  confirmar(){
    this.ventaOrdenServices.editEstadoVentaOrden(this.dataIdVentaOrden.idVentaOrden, this.form.value).subscribe(
      (data)=>{
          console.log("se edito estado de orden");
          this.snackBar.open("Se cambio estado de orden","exito",{
            duration:4000,
            verticalPosition:"top"
          });
          this.cerrarDialogo();
          
      },
      (error)=>{
        console.log("se edito estado de orden");
        this.snackBar.open("No se pudo cambiar el estado","error",{
          duration:4000,
          verticalPosition:"top"
        });
      }
    );

  }
  controlHasError(control: string, error: string): boolean {
    return this.form.controls[control].hasError(error) && this.form.controls[control].touched
  }  

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
}
