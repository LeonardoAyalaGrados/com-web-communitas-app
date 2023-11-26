import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './admin/books/book-list/book-list.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { RegisterComponent } from './register/register.component';
import { SidebarClientComponent } from './client/sidebar-client/sidebar-client.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { AuthAdminGuard } from 'src/helpers/authAdmin.guard';
import { AuthClientGuard } from 'src/helpers/authClient.guard';
import { CarritoBookComponent } from './carrito-book/carrito-book.component';
import { PedidosComponent } from './client/pedidos/pedidos.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { PerfilComponent } from './admin/perfil/perfil.component';

const routes: Routes = [
  {path:"",component:HomeComponent, pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"admin", component:SidebarAdminComponent, children:[
                             {path:"user-list", component:UserListComponent,canActivate:[AuthAdminGuard]},
                             {path:"book-list", component:BookListComponent,canActivate:[AuthAdminGuard]},
                             {path:"orders-admin", component:OrdersComponent, canActivate:[  AuthAdminGuard]},
                             {path:"admin-profile", component:PerfilComponent, canActivate:[AuthAdminGuard]}
  ]},
  {path:"register",component:RegisterComponent},
  {path:"client", component:SidebarClientComponent,children:[
                                {path:"profile", component:ClientProfileComponent,canActivate:[AuthClientGuard]},
                                {path:"orders" ,component:PedidosComponent,canActivate:[AuthClientGuard]}
  ]},
  {path:"carrito",component:CarritoBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
