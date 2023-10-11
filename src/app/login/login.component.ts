import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  myForm: FormGroup;
  siteKey: string;

  constructor(private fb: FormBuilder, private router:Router, private snackbar: MatSnackBar){
    this.siteKey='6Ld1QlQoAAAAAH0EsnvbwOTAwtOdqxQ_4AK6nYHr';
    this.myForm=this.fb.group(
      {
        email:['',[Validators.required, this.customEmailValidator]],
        password:['',[Validators.required, Validators.min(8)]],
        captcha:['',[Validators.required]]
      }
    );
  }


  iniciarSesion(){
    this.snackbar.open("credenciales correctas","Listo",{
      duration:4000,            
      verticalPosition:"top"
    });
      this.router.navigate(["/admin/user-list"]);
  };
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
