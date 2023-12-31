import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BookServicesService } from 'src/app/services/book-services.service';
import { Book, BookPage } from 'src/model/bookl.model';
import { ModalSaveBookComponent } from './modal-save-book/modal-save-book.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  dataBook:Book[]=[];  
  bookPage?:BookPage;
  subscription:Subscription;
  displayedColumns: string[] = ['idLibro', 'imagen', 'titulo', 'precio','stock','autor','tapa','creadoEn','anio','nombreCategoria','actions'];

  ngOnInit(): void {
    this.listBooks();
    this.subscription=this.bookServices.refresh$.subscribe(
      ()=>{
        this.listBooks();
        console.log("evento");
      }
    );
  }

  constructor(private bookServices:BookServicesService,public dialogo: MatDialog){
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listBooks(){
    this.bookServices.paginate().subscribe(
      (data)=>{
        this.bookPage=data;
      },
      (error)=>{
          console.log(error);
      }
    );
  }


  modalNewBook(){
    this.dialogo
    .open(ModalSaveBookComponent, {
      // data: `¿Te gusta programar en TypeScript?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.listBooks();
        // this.snackBar.open("Usuario agregado","exito",{
        //   duration:4000,
        //   verticalPosition:"top"
        //   });
      }
      
    });
  }

  paginateUser(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;
  
    this.bookServices.paginate(size, page)
      .subscribe(bookPage => {
        this.bookPage = bookPage;
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
   
  }


}
