import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { User, UserPage } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  apiURLAdminUsers:string=enviroment.apiURLAdminUsers;  

  constructor(private httpClient:HttpClient) { 
  }

  paginate(size: number = 5, page: number = 0): Observable<UserPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'fullName');

    return this.httpClient.get<UserPage>(`${this.apiURLAdminUsers}`, { params });
  }

  listUsers():Observable<any>{
    return this.httpClient.get(`${this.apiURLAdminUsers}/list`);
  }
  saveUser(user:any):Observable<any>{
     return this.httpClient.post<User>(`${this.apiURLAdminUsers}/save/`,user);
  }
}
