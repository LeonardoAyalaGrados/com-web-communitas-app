import { Component } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CardItemsService } from '../services/card-items.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  nombreUsuario:any;
  constructor(public userServices:UserServicesService, private router:Router, private cartService:CardItemsService){
    
  }

  logout(){
    this.userServices.cerrarSesion();
    this.router.navigate(['']);

  }

  get cartItems(){
    return this.cartService.items;
  }

}
