import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  apiDistrict:string=enviroment.apiURLAdminDistrict;
  
  constructor(private httpClient:HttpClient) { }

  listDistrict():Observable<any>{
    return this.httpClient.get(`${this.apiDistrict}/list`);
  }
}
