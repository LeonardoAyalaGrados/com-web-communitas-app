import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cambiar-estado-modal',
  templateUrl: './cambiar-estado-modal.component.html',
  styleUrls: ['./cambiar-estado-modal.component.css']
})
export class CambiarEstadoModalComponent implements OnInit {
  ventaOrdenes:any[]=[];
  form:FormGroup;
  ventaOrden:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dataIdVentaOrden: { idVentaOrden: any, ventaOrdenes:any}, private fb:FormBuilder){
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

  }
  controlHasError(control: string, error: string): boolean {
    return this.form.controls[control].hasError(error) && this.form.controls[control].touched
  }  
}
