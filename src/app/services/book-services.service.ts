import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { BookPage } from 'src/model/bookl.model';

@Injectable({
  providedIn: 'root'
})
export class BookServicesService {

   apiBook:string=enviroment.apiURLAdminBooks;
  constructor(private httpClient:HttpClient) { }

  paginate(size: number = 5, page: number = 0): Observable<BookPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'idLibro');

    return this.httpClient.get<BookPage>(`${this.apiBook}`, { params });
  }
}
