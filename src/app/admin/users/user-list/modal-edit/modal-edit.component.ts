import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  cadena:string;
  myForm:FormGroup;
  distritos:any[]=[];
  public idDistritoMatSelect:number;
 

  constructor(@Inject(MAT_DIALOG_DATA) public dataIdUsuario: { idUsuario: any }, private usuarioServices:UserServicesService ,
                  private districtServices:DistrictService,public dialogo: MatDialogRef<ModalEditComponent> ,private fb:FormBuilder, private snackBar:MatSnackBar){
    this.myForm=this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(3)]],
      apellido:['',[Validators.required,Validators.minLength(5)]],
      celular:['',[Validators.required, Validators.minLength(9)]],
      email:['',[Validators.required,this.customEmailValidator]],
      contraseña:['',[Validators.required, this.validacionLongitudContraseña(8)]],
      rol:['',Validators.required],
      direccion:['',Validators.required],
      // distrito:[{idDistrito:[Validators.required]}],
      distrito: this.fb.group({
        idDistrito:[Validators.required]}),
    }
    );
  }

   ngOnInit():void {    
    this.listarDistritos();
    setTimeout(()=>{
      this.buscarUsuarioPorId();
    },3000);
    

  }

  buscarUsuarioPorId(){
    this.usuarioServices.findById(this.dataIdUsuario.idUsuario).subscribe(
      (data)=>{
          this.usuarioEncontrado=data;
          console.log(data);
          this.myForm.patchValue(data);

          this.idDistritoMatSelect=data.distrito;
          console.log(this.idDistritoMatSelect);
          
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  editatUsuario(){
    this.usuarioServices.editUser(this.dataIdUsuario.idUsuario,this.myForm.value).subscribe(
      (data)=>{
        console.log(data);
        this.snackBar.open("Usuario editado","exito",{
          duration:4000,
          verticalPosition:"top"
        });
        this.cerrarDialogo();
      },
      (error)=>{
        console.log(error);
        this.snackBar.open("No se puedo editar","ok",{
          duration:4000,
          verticalPosition:"top"
        });
        this.cerrarDialogo();
      }
    );
    
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
  createSlugNombre() {
    const nombre = this.myForm!.controls['nombre'].value;
    const nombreLimpio = nombre.replace(/[^a-zA-Z\s]/g, '');
    this.myForm!.controls['nombre'].setValue(nombreLimpio);
  }


  createSlugApellido() {
    const apellido = this.myForm!.controls['apellido'].value;
    const apellidoLimpio = apellido.replace(/[^a-zA-Z\s]/g, '');
    this.myForm!.controls['apellido'].setValue(apellidoLimpio);
  }


  createSlugCelular() {
    const celular = this.myForm!.controls['celular'].value;
    
    // Reemplaza todo lo que no sea un dígito con una cadena vacía
    let celularLimpio = celular.replace(/[^\d]/g, '');
  
    // Agrega un "9" al principio si no comienza con "9"
    if (!celularLimpio.startsWith('9')) {
      celularLimpio = '9' + celularLimpio;
    }
  
    this.myForm!.controls['celular'].setValue(celularLimpio);
  }


  validacionLongitudContraseña(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minLength) {
        return { passwordLength: true };
      }
      return null;
    };
  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
}
