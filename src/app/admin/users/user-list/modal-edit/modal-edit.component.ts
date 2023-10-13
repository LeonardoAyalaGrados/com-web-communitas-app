import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DistrictService } from 'src/app/services/district.service';
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
  myForm:FormGroup;
  distritos:any[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public dataIdUsuario: { userId: any }, private usuarioServices:UserServicesService ,
                         private districtServices:DistrictService, private fb:FormBuilder, private snackBar:MatSnackBar){
    this.myForm=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      celular:['',Validators.required],
      email:['',[Validators.required,this.customEmailValidator]],
      contraseña:['',Validators.required],
      rol:['',Validators.required],
      direccion:['',Validators.required],
      // distrito:[{idDistrito:[Validators.required]}],
      distrito: this.fb.group({
        idDistrito:['',Validators.required]}),
    }
    );
  }

  ngOnInit(): void {
    console.log(this.dataIdUsuario);
    this.listarDistritos();
    this.buscarUsuarioPorId();

  }

// Se crea esta funcion ya que desde el @Injec dataIdUsuario por defecto nos manda un valor 
// del tipo objeto ejemplo: {idUsuario:2} y solo necesitamos el valor del id

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
          this.myForm.patchValue(data);
          const distritoControl = this.myForm.get('distrito.idDistrito');
          if (distritoControl) { // Verifica que distritoControl no sea null
            const distritoId = data.distrito;
            distritoControl.setValue(distritoId);
            console.log(data.distrito);
          }
          
          
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  editatUsuario(){
    
  }

  listarDistritos(){
    this.districtServices.listDistrict().subscribe(
      (data)=>{
          this.distritos=data;
          console.log(data);
      },
      (error)=>{
          console.log("error el listar paises")
      }
    );
  }
  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(value)) {
      return { invalidEmail: true };
    }

    return null;
  }

  
  onDistritoSeleccionado(valorSeleccionado: number){
    console.log('Valor seleccionado:', valorSeleccionado);
    if (this.myForm) {
      const distritoControl = this.myForm.get('distrito.idDistrito');
      if (distritoControl) {
        distritoControl.setValue(valorSeleccionado);
      }
    }
  }
 
  controlHasError(control: string, error: string): boolean {
    return this.myForm.controls[control].hasError(error) && this.myForm.controls[control].touched
  }  
  
  createSlug() {
    const emailValue = this.myForm!.controls['email'].value;
    const safeCharacters = emailValue
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/(\.|-)+/g, '$1') // Replace multiple dots or hyphens with a single occurrence
      .replace(/^-+/, '') // Trim - from the start of text
      .replace(/-+$/, '') // Trim - from the end of text
      .replace(/[^a-zA-Z0-9@.-]/g, ''); // Remove characters other than letters, numbers, @, . (dot), and hyphens
  
    this.myForm!.controls['email'].setValue(safeCharacters);
  }
}
