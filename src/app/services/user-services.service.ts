import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { User, UserPage } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  apiURLAdminUsers:string=enviroment.apiURLAdminUsers;  
  apiURLHome:string=enviroment.apiURLHome;  


  constructor(private httpClient:HttpClient) { 
  }

  paginate(size: number = 5, page: number = 0): Observable<UserPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'idUsuario');

    return this.httpClient.get<UserPage>(`${this.apiURLAdminUsers}`, { params });
  }

  listUsers():Observable<any>{
    return this.httpClient.get(`${this.apiURLAdminUsers}/list`);
  }
  saveUser(user:any):Observable<any>{
     return this.httpClient.post<any>(`${this.apiURLAdminUsers}/save`,user);
  }

  saveUserClient(user:any):Observable<any>{
      return this.httpClient.post<any>(`${this.apiURLHome}/save`,user);
  }

  findById(userId:any):Observable<any>{
    return this.httpClient.get(`${this.apiURLAdminUsers}/id/${userId}`);
  }

  findUserForEmail(email:any):Observable<any>{
    return this.httpClient.get<any>(`${this.apiURLAdminUsers}/findbyemail?email=${email}`);
    
  }

  //USUARIO Y CREDENCIALES GUARDADOS EN EL LOCALSTORAGE
  login(credentials:any):Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080/login",credentials,{
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

}
