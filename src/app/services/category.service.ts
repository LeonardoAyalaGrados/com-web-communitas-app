import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiCategory:string=enviroment.apiURLCategoria;
  
  constructor(private httpClient:HttpClient) { }

  listCategoryWhitBook():Observable<any>{
    return this.httpClient.get<any>(`${this.apiCategory}/list`);
  }
}
