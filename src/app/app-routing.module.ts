import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './admin/books/book-list/book-list.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"",component:HomeComponent, pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"admin", component:SidebarAdminComponent, children:[
                             {path:"user-list", component:UserListComponent},
                             {path:"book-list", component:BookListComponent}
  ]},
  {path:"register",component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
