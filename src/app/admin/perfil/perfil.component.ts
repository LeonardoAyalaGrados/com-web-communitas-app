import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DistrictService } from 'src/app/services/district.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  nombreUsuario:any;
  idUsuario:any;
  usuarioEncontrado:any
  myForm:FormGroup;
  distritos:any[]=[];
  public idDistritoMatSelect:number;
  constructor(private districtServices:DistrictService,private fb:FormBuilder,private usuarioServices:UserServicesService){
    this.idUsuario=usuarioServices.getUser().idUsuario;
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
  ngOnInit(): void {
   
  
      this.buscarUsuarioPorId();
  
    
  }

  buscarUsuarioPorId(){
    this.usuarioServices.findById(this.idUsuario).subscribe(
      (data)=>{
          this.usuarioEncontrado=data;
          console.log(data);
          this.myForm.patchValue(data);

          this.idDistritoMatSelect=data.distrito;
          console.log(this.idDistritoMatSelect);
          this.myForm.get('distrito.idDistrito')?.setValue(data.distrito);
          
      },
      (error)=>{
        console.log(error);
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

  onDistritoSeleccionado(valorSeleccionado: number){
    console.log('Valor seleccionado:', valorSeleccionado);
    if (this.myForm) {
      const distritoControl = this.myForm.get('distrito.idDistrito');
      if (distritoControl) {
        distritoControl.setValue(valorSeleccionado);
      }
    }
  }
}
