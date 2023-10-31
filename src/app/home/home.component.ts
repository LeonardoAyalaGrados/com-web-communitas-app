import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CardItemsService } from '../services/card-items.service';
import { Book } from 'src/model/bookl.model';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  categorias:any[]=[];
  categoriasSeleccionadas:number[]=[];
  librosFiltrados:any[]=[];
  

  ngOnInit(): void {
    this.listCategory();
  }

  constructor(private categoryService:CategoryService, private cardServices:CardItemsService){
    
  }

  listCategory(){
    this.categoryService.listCategoryWhitBook().subscribe(
      (data)=>{
        console.log(data);
        this.categorias=data;
        this.librosFiltrados = this.obtenerTodosLosLibros();

      },
      (error)=>{
        console.log(error);
      }
    );
  }

  filtrarLibrosPorCategoria() {
    if (this.categoriasSeleccionadas.length === 0) {
      // No se han seleccionado categorías, mostrar todos los libros.
      this.librosFiltrados = this.obtenerTodosLosLibros();
    } else {
      // Filtrar los libros según las categorías seleccionadas.
      this.librosFiltrados = this.categoriasSeleccionadas
        .map(idCategoria => this.obtenerLibrosPorCategoria(idCategoria))
        .flat(); // Asegurarse de que la lista sea plana
    }
  }

  obtenerTodosLosLibros() {
    return this.categorias.flatMap(categoria => categoria.libros);
  }

  obtenerLibrosPorCategoria(idCategoria:any) {
    const categoria = this.categorias.find(c => c.idCategoria === idCategoria);
    return categoria ? categoria.libros : [];
  }

  toggleCategoriaSelection(idCategoria: number) {
    if (this.categoriasSeleccionadas.includes(idCategoria)) {
      // Si la categoría ya está seleccionada, la deseleccionamos
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(c => c !== idCategoria);
    } else {
      // Si la categoría no está seleccionada, la seleccionamos
      this.categoriasSeleccionadas.push(idCategoria);
    }
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
  
}
