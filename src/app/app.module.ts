import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { BookListComponent } from './admin/books/book-list/book-list.component';
import { SidebarAdminComponent } from './admin/sidebar-admin/sidebar-admin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ModalSaveUserComponent } from './admin/users/user-list/modal-save-user/modal-save-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { ModalEditComponent } from './admin/users/user-list/modal-edit/modal-edit.component';
import { RegisterComponent } from './register/register.component';
import { ImagePipePipe } from './shared/image-pipe.pipe';
import { SidebarClientComponent } from './client/sidebar-client/sidebar-client.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { NombreDelInterceptorInterceptor } from 'src/helpers/auth.interceptor';
import { SolesPipePipe } from './shared/soles-pipe.pipe';
import { ModalSaveBookComponent } from './admin/books/book-list/modal-save-book/modal-save-book.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { CarritoBookComponent } from './carrito-book/carrito-book.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    HomeComponent,
    UserListComponent,
    BookListComponent,
    SidebarAdminComponent,
    ModalSaveUserComponent,
    ModalEditComponent,
    RegisterComponent,
    ImagePipePipe,
    SidebarClientComponent,
    ClientProfileComponent,
    SolesPipePipe,
    ModalSaveBookComponent,
    CarritoBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    NgxCaptchaModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:NombreDelInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
