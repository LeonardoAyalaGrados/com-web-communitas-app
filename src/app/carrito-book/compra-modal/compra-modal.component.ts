import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalSaveBookComponent } from 'src/app/admin/books/book-list/modal-save-book/modal-save-book.component';
import { CardItemsService } from 'src/app/services/card-items.service';
import { VentaOrdenService } from 'src/app/services/venta-orden.service';
import { VentaRequest } from 'src/model/ventaRequest.model';

@Component({
  selector: 'app-compra-modal',
  templateUrl: './compra-modal.component.html',
  styleUrls: ['./compra-modal.component.css']
})
export class CompraModalComponent implements OnInit {
  form:FormGroup;
  headers: HttpHeaders;
  constructor(@Inject(MAT_DIALOG_DATA) public compraUsuario:{ventaRequest:VentaRequest},private router:Router,private cardItemsServices:CardItemsService,private snackBar:MatSnackBar,private ventaOrdenServices:VentaOrdenService,public dialogo: MatDialogRef<CompraModalComponent>,private fb: FormBuilder, private spinnerService: NgxSpinnerService){
    
    this.form = this.fb.group({
      creditCard: ['', [Validators.required,this.validacionLongitud(19)]],
      creditCardDate: ['', [Validators.required,this.validacionLongitud(5)]],
      creditCardCvv: ['', [Validators.required,this.validacionLongitud(3)]],
    });

  }

    ngOnInit() {
     console.log(this.compraUsuario.ventaRequest)
    }

    generarCompra() {
      this.showSpinner();
      this.ventaOrdenServices.crearVenta(this.compraUsuario.ventaRequest).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          // Realizar acciones adicionales según la respuesta del servidor
        },
        (error) => {
          
          console.log('Error del servidor:', error);
      
          // Intentar obtener el cuerpo de la respuesta como texto
          const bodyAsText = error.error.text;
      
          try {
            // Tratar de analizar el cuerpo de la respuesta como JSON
            const bodyAsJson = JSON.parse(bodyAsText);
      
            // Realizar acciones adicionales según el cuerpo JSON
            console.log('Cuerpo de la respuesta JSON:', bodyAsJson);
          } catch (e) {
            // Si no se puede analizar como JSON, tratarlo como texto normal
            console.error('No se pudo analizar como JSON:', bodyAsText);
      
            // Realizar acciones adicionales según el texto
            // Por ejemplo, mostrar el mensaje al usuario
            //alert(bodyAsText);
           
            
              this.snackBar.open("Se realizo la compra con exito","OK",{
                duration:6000,
                verticalPosition:"top"
              });
              this.cardItemsServices.clear();
              this.cerrarDialogo();
              this.router.navigate(["client/orders"]);

            
          }
      
        }
      );
      
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
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  showSpinner() {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 3000); 
  }
}

