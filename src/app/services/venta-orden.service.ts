import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { VentaRequest } from 'src/model/ventaRequest.model';

@Injectable({
  providedIn: 'root'
})
export class VentaOrdenService {
  apiVentaOrden:string=enviroment.apiURLVentaOrden;
  apiCrearVenta:string=enviroment.apiURLCrearVenta;

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private _refresh$=new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

  constructor(private httpClient:HttpClient) { }

  listVentaOrden():Observable<any>{
    return this.httpClient.get(`${this.apiVentaOrden}/list`);
  }

  listVentaOrdenConUsuario():Observable<any>{
    return this.httpClient.get(`${this.apiVentaOrden}/list-user-orders`);
  }

  editEstadoVentaOrden(idVentOrden:any,estado:any):Observable<any>{
    return this.httpClient.put(`${this.apiVentaOrden}/estado/${idVentOrden}`,estado)
    .pipe(tap(()=>{
      this._refresh$.next();
    }));;
  }

  crearVenta(ventaRequest: any):Observable<any> {
    return this.httpClient.post<any>
            (`${this.apiCrearVenta}`, ventaRequest);
  }
}
