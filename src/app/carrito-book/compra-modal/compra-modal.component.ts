import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      creditCard: ['', Validators.required],
      creditCardDate: ['', Validators.required],
      creditCardCvv: ['', Validators.required],
    });
  }


    ngOnInit() {
    
    }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  generarCompra(){

  }

  controlHasError(control: string, error: string): boolean {
    return this.form.controls[control].hasError(error) && this.form.controls[control].touched
  }
}
