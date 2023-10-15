import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  myForm: FormGroup;
  siteKey: string;
  userData:any;

  constructor(private fb: FormBuilder, private router:Router, private snackbar: MatSnackBar, private usuarioServices:UserServicesService){
    this.siteKey='6Ld1QlQoAAAAAH0EsnvbwOTAwtOdqxQ_4AK6nYHr';
    this.myForm=this.fb.group(
      {
        correo:['',[Validators.required, this.customEmailValidator]],
        contraseña:['',[Validators.required, Validators.min(8)]],
        captcha:['',[Validators.required]]
      }
    );
  }

  iniciarSesion():any{
    const credentials=this.myForm.value;
    this.usuarioServices.login(credentials.correo,credentials.contraseña).subscribe(
      (data)=>{
        console.log("login data "+this.myForm.value);
        this.snackbar.open("credenciales correctas","BIENVENIDO",{
          duration:4000,
          verticalPosition:"top"
        });
        this.usuarioServices.findUserForEmail(this.myForm.value.correo).subscribe(
          (data:any)=>{
            this.userData=data;
            console.log(data);
            this.usuarioServices.setUser(this.userData);
            console.log(this.usuarioServices.getUser().rol);
            if(this.usuarioServices.getUser().rol==='ADMINISTRADOR'){
                this.router.navigate(['admin/user-list']);
            }if(this.usuarioServices.getUser().rol==='USUARIO'){
              this.router.navigate(['client/profile']);
            }


          },(error:any)=>{
            console.log(error);
          }
          );

      },(error)=>{
          console.log(error);
          this.snackbar.open("credenciales incorrectas","ok",{
            duration:4000,            
            verticalPosition:"top"
          });
          this.router.navigate([""]);
      }
    );
  }


  createSlug() {
    const emailValue = this.myForm!.controls['correo'].value;
    const safeCharacters = emailValue
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/(\.|-)+/g, '$1') // Replace multiple dots or hyphens with a single occurrence
      .replace(/^-+/, '') // Trim - from the start of text
      .replace(/-+$/, '') // Trim - from the end of text
      .replace(/[^a-zA-Z0-9@.-]/g, ''); // Remove characters other than letters, numbers, @, . (dot), and hyphens
  
    this.myForm!.controls['correo'].setValue(safeCharacters);
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
}
