import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';
import { BookPage } from 'src/model/bookl.model';

@Injectable({
  providedIn: 'root'
})
export class BookServicesService {

  apiBook:string=enviroment.apiURLAdminBooks;
  private _refresh$=new Subject<void>();
  constructor(private httpClient:HttpClient) { }


  get refresh$(){
    return this._refresh$;
  }

  paginate(size: number = 5, page: number = 0): Observable<BookPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'idLibro');

    return this.httpClient.get<BookPage>(`${this.apiBook}`, { params });
  }

  upploadFile(formData: FormData):Observable<any>{
    return this.httpClient.post(`http://localhost:8080/api/media/upload`,formData);
}

  saveBook(book:any):Observable<any>{
    return this.httpClient.post(`${this.apiBook}/save`,book)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }
}
