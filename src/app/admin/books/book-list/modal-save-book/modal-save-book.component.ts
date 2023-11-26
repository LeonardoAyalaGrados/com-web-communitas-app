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


    
    createSlugPrecio() {
      const precioControl = this.myForm!.controls['precio'];
      let precio = precioControl.value.toString();
    
      // Reemplazar todo lo que no sea un dígito o un punto (excepto el punto seguido de "e") con una cadena vacía
      let precioLimpio = precio.replace(/[^\d.]+|[^\d]+\.(?=[^\de])/g, '');
    
      // Eliminar puntos al principio del valor
      precioLimpio = precioLimpio.replace(/^\./, '');
    
      // Limitar la longitud a seis dígitos
      precioLimpio = precioLimpio.slice(0, 6);
    
      // Eliminar puntos adicionales
      precioLimpio = precioLimpio.replace(/\.{2,}/g, '.');
    
      // Permitir solo un punto decimal al final
      precioLimpio = precioLimpio.replace(/(\.\d*)\./g, '$1');
    
      // Establecer el valor limpio en el control
      precioControl.setValue(precioLimpio);
    }
    

    createSlugStock() {
      const stockControl = this.myForm!.controls['stock'];
      let stock = stockControl.value;
    
      // Reemplazar todo lo que no sea un dígito con una cadena vacía
      let stockLimpio = stock.toString().replace(/\D/g, '');
    
      // Limitar la longitud a dos dígitos
      stockLimpio = stockLimpio.slice(0, 2);
    
      // Si la cadena resultante no está vacía, convierte a número, de lo contrario, deja el campo vacío
      const stockNumerico = stockLimpio ? parseInt(stockLimpio, 10) : null;
    
      // Establecer el valor limpio en el control
      stockControl.setValue(stockNumerico);
    
      // Si deseas evitar que se ingresen guiones después de la limpieza, puedes agregar una línea adicional
      stockControl.setValue(stockControl.value.toString().replace('-', ''));
    }
    
    createSlugPaginas() {
      const paginasControl = this.myForm!.controls['paginas'];
      let paginas = paginasControl.value;
    
      // Reemplazar todo lo que no sea un dígito con una cadena vacía
      let paginasLimpio = paginas.toString().replace(/\D/g, '');
    
      // Limitar la longitud a cuatro dígitos
      paginasLimpio = paginasLimpio.slice(0, 4);
    
      // Si la cadena resultante no está vacía, convierte a número, de lo contrario, deja el campo vacío
      const paginasNumerico = paginasLimpio ? parseInt(paginasLimpio, 10) : null;
    
      // Establecer el valor limpio en el control
      paginasControl.setValue(paginasNumerico);
    }

    createSlugAutor() {
      const autorControl = this.myForm!.controls['autor'];
      let autor = autorControl.value;
    
      // Reemplazar todo lo que no sea una letra con una cadena vacía
      let autorLimpio = autor.replace(/[^a-zA-Z]/g, '');
    
      // Convertir a mayúsculas
      autorLimpio = autorLimpio.toUpperCase();
    
      // Establecer el valor limpio en el control
      autorControl.setValue(autorLimpio);
    }

    createSlugAnio() {
      const anioControl = this.myForm!.controls['anio'];
      let anio = anioControl.value;
    
      // Reemplazar todo lo que no sea un dígito con una cadena vacía
      let anioLimpio = anio.toString().replace(/\D/g, '');
    
      // Limitar la longitud a cuatro dígitos
      anioLimpio = anioLimpio.slice(0, 3);
    
      // Si la cadena resultante no está vacía, convierte a número, de lo contrario, deja el campo vacío
      const anioNumerico = anioLimpio ? parseInt(anioLimpio, 10) : null;
    
      // Establecer el valor limpio en el control
      anioControl.setValue(anioNumerico);
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
