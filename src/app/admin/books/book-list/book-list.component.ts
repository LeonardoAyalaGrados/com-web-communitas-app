import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BookServicesService } from 'src/app/services/book-services.service';
import { Book, BookPage } from 'src/model/bookl.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  dataBook:Book[]=[];  
  bookPage?:BookPage;
  displayedColumns: string[] = ['idLibro', 'imagen', 'titulo', 'precio','stock','autor','tapa','creadoEn','anio','actions'];

  ngOnInit(): void {
    this.listBooks();
  }

  constructor(private bookServices:BookServicesService){

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

  modalEditUser(idUsuario:any){}
  modalNewBook(){}

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
