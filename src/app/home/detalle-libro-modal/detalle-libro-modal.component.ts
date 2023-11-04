import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalSaveBookComponent } from 'src/app/admin/books/book-list/modal-save-book/modal-save-book.component';
import { CardItemsService } from 'src/app/services/card-items.service';
import { Book } from 'src/model/bookl.model';

@Component({
  selector: 'app-detalle-libro-modal',
  templateUrl: './detalle-libro-modal.component.html',
  styleUrls: ['./detalle-libro-modal.component.css']
})
export class DetalleLibroModalComponent implements OnInit{
  listLibros:any[]=[];
  libro:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dataIdLibro: { idLibro: any, libros:any },public dialogo: MatDialogRef<DetalleLibroModalComponent>, private cardServices:CardItemsService){

  }
  ngOnInit(): void {
    this.buscarLibroPorId();
  }

  buscarLibroPorId(){
    this.listLibros=this.dataIdLibro.libros;
    const libroEncontrado=this.listLibros.find(libro=>libro.idLibro===this.dataIdLibro.idLibro);
    console.log(libroEncontrado)
    this.libro=libroEncontrado;
    return libroEncontrado;
  }

  
  addBookToCart(book:Book){
    this.cardServices.addItem(book);
  }
  removeBookFromCart(book: Book){
      this.cardServices.removeItem(book);
  }
  bookExistInCart(book:Book):boolean{
    return this.cardServices.itemAlreadyExists(book);
  }


  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
}
