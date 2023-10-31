import { Component, OnInit } from '@angular/core';
import { CardItemsService } from '../services/card-items.service';
import { Book } from 'src/model/bookl.model';
import { CartItem } from 'src/model/cart.model';
import { UserServicesService } from '../services/user-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-carrito-book',
  templateUrl: './carrito-book.component.html',
  styleUrls: ['./carrito-book.component.css']
})
export class CarritoBookComponent implements OnInit{
  itemCarrito: CartItem[] = [];
  totalAPagar: number = 0; 

  ngOnInit(): void {
    
  }

  constructor(private spinnerService: NgxSpinnerService ,private cardServices:CardItemsService,private userServices: UserServicesService){
  }

  get cartItems(){
    return  this.cardServices.items;
  }

  remove(book:Book){
    this.cardServices.removeItem(book);
  }

  get total() {
    return this.cartItems
      .filter(i => i !== null) // Filtrar elementos nulos
      .map(i => i.precio)
      .reduce((p1, p2) => (p1 || 0) + (p2 || 0), 0); // Asegurarse de que p1 y p2 no sean nulos
  }


  generarCompra(){
    const idUsuario=this.userServices.getUser().idUsuario;
    const cartItems= this.cartItems;

    const formData = {
      idUsuario: idUsuario,
      librosSeleccionados: cartItems
    }
    
    this.showSpinner();
    setTimeout(()=>{
      console.log(formData);
    },5000);
  }


   showSpinner() {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000); 
  }
}
