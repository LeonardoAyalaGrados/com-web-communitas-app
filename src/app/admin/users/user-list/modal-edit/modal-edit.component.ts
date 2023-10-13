import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit{
  usuarioEncontrado:any;
  idUsuarioParametro:any;
  cadena:string;
  constructor(@Inject(MAT_DIALOG_DATA) public dataIdUsuario: { userId: any }, private usuarioServices:UserServicesService ){
  }

  ngOnInit(): void {
    console.log(this.dataIdUsuario);
    this.buscarUsuarioPorId();
  }

  recortarHastaPrimerDosPuntos(cadena:string) {
    const indiceDosPuntos = cadena.indexOf(':');
    if (indiceDosPuntos !== -1) {
      const numeroTexto=cadena.substring(indiceDosPuntos + 1).trim();
      const numero = parseInt(numeroTexto);
    return isNaN(numero) ? null : numero;
    } else {
      return cadena; // Si no se encuentra el dos puntos, devuelve la cadena original.
    }
  }

  buscarUsuarioPorId(){
    const cadena =JSON.stringify(this.dataIdUsuario);
     this.idUsuarioParametro= this.recortarHastaPrimerDosPuntos(cadena);

    this.usuarioServices.findById(this.idUsuarioParametro).subscribe(
      (data)=>{
          this.usuarioEncontrado=data;
          console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
