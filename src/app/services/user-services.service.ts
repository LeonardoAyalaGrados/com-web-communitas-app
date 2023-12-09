import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { Sort, User, UserPage } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  apiURLAdminUsers:string=enviroment.apiURLAdminUsers;  
  apiURLHome:string=enviroment.apiURLHome;  

  private _refresh$=new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

  constructor(private httpClient:HttpClient) { 
  }

  paginate(size: number = 5, page: number = 0): Observable<UserPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'idUsuario,desc');

    return this.httpClient.get<UserPage>(`${this.apiURLAdminUsers}`, { params });
  }

  listUsers():Observable<any>{
    return this.httpClient.get(`${this.apiURLAdminUsers}/list`);
  }
  saveUser(user:any):Observable<any>{
     return this.httpClient.post<any>(`${this.apiURLAdminUsers}/save`,user)
     .pipe(
      tap(()=>{this._refresh$.next();}
      )
    );;
  }

  saveUserClient(user:any):Observable<any>{
      return this.httpClient.post<any>(`${this.apiURLHome}/save`,user)
      .pipe(
        tap( ()=>{this._refresh$.next();}
        )
      );
  }

  findById(userId:any):Observable<any>{
    return this.httpClient.get(`${this.apiURLAdminUsers}/id/${userId}`)
    .pipe(
      tap( ()=>{this._refresh$.next();}
      )
    );
  }

  findUserForEmail(email:any):Observable<any>{
    return this.httpClient.get<any>(`${this.apiURLAdminUsers}/findbyemail?email=${email}`);
    
  }

  editUser(idUsuario:any,usuario:any):Observable<any>{
    return this.httpClient.put(`${this.apiURLAdminUsers}/updateuser/${idUsuario}`,usuario)
    .pipe(
      tap( ()=>{this._refresh$.next();}
      )
    );
  
  }

  //USUARIO Y CREDENCIALES GUARDADOS EN EL LOCALSTORAGE
  login(correo:string,contraseña:string):Observable<any>{
    const loginData = {
      correo: correo,
      contraseña: contraseña
    };
    return this.httpClient.post<any>("http://communitas-app.us-east-1.elasticbeanstalk.com/login",loginData,{
    observe:'response'  

  }).pipe(map((response:HttpResponse<any>)=>{
    const boby=response.body;
    const headers=response.headers;

    const bearerToken=headers.get('Authorization')!;
    const token=bearerToken.replace('Bearer ', '');

    localStorage.setItem('token', token);
    return boby;
  }));
}

  getToken(){
    return localStorage.getItem('token');
  }

  public isLoggedIn(){
    let tokenLogged=localStorage.getItem('token');
    if(tokenLogged==''|| tokenLogged==undefined|| tokenLogged==null){
        return false;
    }else{
      return true;
    }
  }

  public cerrarSesion(){
    localStorage.removeItem ('token');
    localStorage.removeItem('user');
    return true;
  }
  
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
   let userLocal=localStorage.getItem('user')!;
   return JSON.parse(userLocal);
  }

  public getRol() {
    let objetoUser = this.getUser();
    if (objetoUser && objetoUser.rol) {
      return objetoUser.rol;
    } else {
      // Puedes manejar el caso en el que 'rol' sea nulo de alguna manera apropiada.
      return 'Rol no encontrado';
    }
  }
}
