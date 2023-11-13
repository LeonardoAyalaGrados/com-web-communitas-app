import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalSaveBookComponent } from 'src/app/admin/books/book-list/modal-save-book/modal-save-book.component';

@Component({
  selector: 'app-compra-modal',
  templateUrl: './compra-modal.component.html',
  styleUrls: ['./compra-modal.component.css']
})
export class CompraModalComponent {
  form:FormGroup;
  constructor(public dialogo: MatDialogRef<ModalSaveBookComponent>,private fb: FormBuilder){
    this.form = this.fb.group({
      creditCard: ['', [Validators.required,this.validacionLongitud(19)]],
      creditCardDate: ['', [Validators.required,this.validacionLongitud(5)]],
      creditCardCvv: ['', [Validators.required,this.validacionLongitud(3)]],
    });
  }


    ngOnInit() {
    
    }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  generarCompra(){

  }
  
  validatorCrediCard() {
    const crediCardControl = this.form!.controls['creditCard'];
      let crediCardValue = crediCardControl.value;
  
      // Eliminar caracteres no numéricos
      const numericOnly = crediCardValue.replace(/\D/g, '');
  
      // Agregar guiones cada 4 dígitos
      const formattedCreditCard = numericOnly.replace(/(\d{4})/g, '$1-');
  
      // Limitar a 16 dígitos y eliminar guión adicional al final
      const truncatedCreditCard = formattedCreditCard.slice(0, 19);
      this.form!.controls['creditCard'].setValue(truncatedCreditCard);
    
  }

  validatorcreditCardDate(){
    const expirationDateControl = this.form!.controls['creditCardDate'];
    let expirationDateValue = expirationDateControl.value;

    // Eliminar caracteres no numéricos
    const numericOnly = expirationDateValue.replace(/\D/g, '');

    // Agregar una barra después de los primeros 2 caracteres
    let formattedExpirationDate = numericOnly.replace(/(\d{2})(\d{0,2})/, '$1/$2');

    // Limitar a 5 caracteres (MM/YY)
    formattedExpirationDate = formattedExpirationDate.slice(0, 5);

    this.form!.controls['creditCardDate'].setValue(formattedExpirationDate);
  }

  validatorcreditCardCvv(){
    const cvvControl = this.form!.controls['creditCardCvv'];
      let cvvValue = cvvControl.value;
  
      // Eliminar caracteres no numéricos
      const numericOnly = cvvValue.replace(/\D/g, '');
  
      // Limitar a 3 caracteres
      const truncatedCVV = numericOnly.slice(0, 3);
      this.form!.controls['creditCardCvv'].setValue(truncatedCVV);
  }


  validacionLongitud(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minLength) {
        return { dato: true };
      }
      return null;
    };
  }
  controlHasError(control: string, error: string): boolean {
    return this.form.controls[control].hasError(error) && this.form.controls[control].touched
  }
}
