import { Component, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookServicesService } from 'src/app/services/book-services.service';

@Component({
  selector: 'app-modal-save-book',
  templateUrl: './modal-save-book.component.html',
  styleUrls: ['./modal-save-book.component.css']
})
export class ModalSaveBookComponent {
  myForm:FormGroup;
  constructor(public dialogo: MatDialogRef<ModalSaveBookComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,private fb:FormBuilder, private snackBar: MatSnackBar,private bookServices: BookServicesService){
      this.myForm=this.fb.group({
        titulo:['',Validators.required],
        descripcion:['',Validators.required],
        precio:['',Validators.required],
        imagen:['',Validators.required],
        stock:['',Validators.required],
        autor:['',Validators.required],
        paginas:['',Validators.required],
        anio:['',Validators.required],
        tapa:['',Validators.required],
        categoria:this.fb.group({
          idCategoria:[Validators.required]
        }
        ),

      });
    }

    newBookSave(){
      console.log(this.myForm.value);
      this.bookServices.saveBook(this.myForm.value).subscribe(
        (data)=>{
          this.snackBar.open("Libro agregado","EXITO",{
            duration:4000,
            verticalPosition:"top"
          });
          this.cerrarDialogo();
        },
        (error)=>{
          console.log(error);
          this.snackBar.open("No se pudo agregar","ERROR",{
            duration:4000,
            verticalPosition:"top"
          });
        }
      );
    }

    controlHasError(control: string, error: string): boolean {
      return this.myForm.controls[control].hasError(error) && this.myForm.controls[control].touched
    }    

    uploadFile(event: any, control:string){
      const file= event?.target.files[0];
      if (file) {
        const formData=new FormData();
        formData.append('file',file);
        this.bookServices.upploadFile(formData).subscribe(
          (data)=>{
            console.log(data);
            this.myForm!.controls[control].setValue(data.path);
          },(error)=>{
            console.log(error);
          }
        );
      }
    }
    onCategoriaSeleccionado(valorSeleccionado: number){
      console.log('Valor categoria seleccionado:', valorSeleccionado);
      if (this.myForm) {
        const distritoControl = this.myForm.get('categoria.idCategoria');
        if (distritoControl) {
          distritoControl.setValue(valorSeleccionado);
        }
      }
    }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
}
