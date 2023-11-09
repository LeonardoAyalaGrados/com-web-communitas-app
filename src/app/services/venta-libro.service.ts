import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VentaLibroService {
  apiVentaLibro:string=enviroment.apiURLVentaLibro;

  constructor(private httpClient:HttpClient) { }

  listVentaLibro():Observable<any>{
    return this.httpClient.get(`${this.apiVentaLibro}/list`);
  }
}
