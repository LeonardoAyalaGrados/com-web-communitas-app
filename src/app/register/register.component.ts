import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DistrictService } from '../services/district.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  myForm:FormGroup;
  distritos:any=[];

  constructor(private userService:UserServicesService,private snackBar:MatSnackBar, private districtService:DistrictService ,private router:Router, private fb: FormBuilder){
    this.myForm=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      celular:['',Validators.required],
      email:['',[Validators.required,this.customEmailValidator]],
      contraseña:['',[Validators.required, this.validacionLongitudContraseña(8)]],
      direccion:['',Validators.required],
      distrito: this.fb.group({
        idDistrito:[Validators.required]}),
    });
  }
  ngOnInit(): void {
    this.listarDistritos();
  }

  saveUserHome(){
    this.userService.saveUserClient(this.myForm.value).subscribe(
      (data)=>{
          console.log(data);
          this.snackBar.open("Usuario registrado","exito",{
            duration:4000,
            verticalPosition:"top"
          });
          this.router.navigate(['/login']);
      },
      (error)=>{
        console.log(error);
        this.snackBar.open("No se pudo registrar","error",{
          duration:4000,
          verticalPosition:"top"
        });
      }
    );
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


  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(value)) {
      return { invalidEmail: true };
    }

    return null;
  }

  createSlug() {
    const emailValue = this.myForm!.controls['correo'].value;
    const safeCharacters = emailValue
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/(\.|-|_)+/g, '$1') // Replace multiple dots, hyphens, or underscores with a single occurrence
      .replace(/^-+/, '') // Trim - from the start of text
      .replace(/-+$/, '') // Trim - from the end of text
      .replace(/[^a-zA-Z0-9@._-]/g, ''); // Remove characters other than letters, numbers, @, . (dot), hyphens, and underscores
    this.myForm!.controls['correo'].setValue(safeCharacters);
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

  controlHasError(control: string, error: string): boolean {
    return this.myForm.controls[control].hasError(error) && this.myForm.controls[control].touched
  }  
  
}
