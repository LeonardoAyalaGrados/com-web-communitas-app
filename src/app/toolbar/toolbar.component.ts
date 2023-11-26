import { Component, OnInit } from '@angular/core';
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
export class ToolbarComponent implements OnInit{
  nombreUsuario:any;
  usuarioRol:any;
  constructor(public userServices:UserServicesService, private router:Router, private cartService:CardItemsService){
  }
  ngOnInit(): void {
  }

  logout(){
    this.userServices.cerrarSesion();
    this.router.navigate(['login']);

  }

  get cartItems(){
    return this.cartService.items;
  }

  rolUsuario(){
   this.usuarioRol=this.userServices.getRol();
   return this.rolUsuario;
  }

}
