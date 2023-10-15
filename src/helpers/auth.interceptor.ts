import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServicesService } from 'src/app/services/user-services.service';

@Injectable()
export class NombreDelInterceptorInterceptor implements HttpInterceptor {

  constructor(private usuarioService:UserServicesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.usuarioService.getToken();
    if (token) {
      const cloned=request.clone({
      headers: request.headers.set('Authorization',`Bearer ${token}`)
    });
    return next.handle(cloned);
    }
  
      return next.handle(request);
    }
  
}
