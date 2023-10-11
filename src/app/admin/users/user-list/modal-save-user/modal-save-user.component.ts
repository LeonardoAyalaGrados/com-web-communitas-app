import { group } from '@angular/animations';
import { Component,Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DistrictService } from 'src/app/services/district.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-modal-save-user',
  templateUrl: './modal-save-user.component.html',
  styleUrls: ['./modal-save-user.component.css']
})
export class ModalSaveUserComponent implements OnInit {

  myForm:FormGroup;
  distritos:any[]=[];

  constructor(private districtService: DistrictService ,public dialogo: MatDialogRef<ModalSaveUserComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb:FormBuilder, private snackBar: MatSnackBar,private usuarioService: UserServicesService){
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
        idDistrito:[Validators.required]}),
    }
    );
  }
  ngOnInit(): void {
    this.listarDistritos();
  }

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(value)) {
      return { invalidEmail: true };
    }

    return null;
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
  

  confirmado(){
    
    console.log(this.myForm.value);
      this.usuarioService.saveUser(this.myForm.value).subscribe(
        (data)=>{
          console.log(data);
          console.log(this.myForm);
          this.snackBar.open("Usuario registrado","exito",{
            duration:4000,
            verticalPosition:"top"
          });
          this.cerrarDialogo();
        },(error)=>{
          console.log(error);
          console.log(this.myForm);
          this.snackBar.open("No se pudo registrar","error",{
            duration:4000,
            verticalPosition:"top"
          });
        })};
      
  controlHasError(control: string, error: string): boolean {
    return this.myForm.controls[control].hasError(error) && this.myForm.controls[control].touched
  }    
  
  listarDistritos(){
    this.districtService.listDistrict().subscribe(
      (data)=>{
          this.distritos=data;
          console.log(data);
      },
      (error)=>{
          console.log("error el listar paises")
      }
    );
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
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
}

