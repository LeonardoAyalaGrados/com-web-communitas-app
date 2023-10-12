import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
      contraseña:['',Validators.required],
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

  controlHasError(control: string, error: string): boolean {
    return this.myForm.controls[control].hasError(error) && this.myForm.controls[control].touched
  }  
  
}
