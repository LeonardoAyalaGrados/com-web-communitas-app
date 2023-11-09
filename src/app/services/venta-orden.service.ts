import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VentaOrdenService {
  apiVentaOrden:string=enviroment.apiURLVentaOrden;
  constructor(private httpClient:HttpClient) { }

  listVentaOrden():Observable<any>{
    return this.httpClient.get(`${this.apiVentaOrden}/list`);
  }
}
