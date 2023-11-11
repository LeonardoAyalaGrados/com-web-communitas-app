import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserServicesService } from 'src/app/services/user-services.service';
import { User, UserPage } from 'src/model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalSaveUserComponent } from './modal-save-user/modal-save-user.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy{

  dataUser:User[]=[];  
  userPage?:UserPage;
  subscription:Subscription;
  displayedColumns: string[] = ['idUsuario', 'fullName', 'celular', 'email','rol','distrito','creadoEn','actualizadoEn','actions'];

  constructor(private userService: UserServicesService, public dialogo: MatDialog){
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("evento destruido");
  }

  ngOnInit(): void {
    this.listUsers();
    this.subscription=this.userService.refresh$.subscribe(
      ()=>{
        this.listUsers();
        console.log("evento listUser");
      }
    );
  }

  listUsers(){
      this.userService.paginate().subscribe(
        (data)=>{
            this.userPage=data;
            console.log(data)
        },
        (error)=>{
          console.log(error);
        }
      );
  }

  modalNewUser(): void {
    this.dialogo
      .open(ModalSaveUserComponent, {
        // data: `¿Te gusta programar en TypeScript?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.listUsers();
          // this.snackBar.open("Usuario agregado","exito",{
          //   duration:4000,
          //   verticalPosition:"top"
          //   });
        }
        
      });
  }

  modalEditUser(idUsuario:any): void {
    this.dialogo
      .open(ModalEditComponent, {
        data: { idUsuario}
        
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.listUsers();
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
  
    this.userService.paginate(size, page)
      .subscribe(bookPage => {
        this.userPage = bookPage;
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
   
  }

  getColorPorRol(rol: string): { [key: string]: string } {
    switch (rol) {
      case 'ADMINISTRADOR':
        return { color: 'blue' };
      case 'USUARIO':
        return { color: 'red' };
      default:
        return {};
    }
  }

}
