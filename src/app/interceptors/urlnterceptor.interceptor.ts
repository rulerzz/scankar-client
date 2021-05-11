import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config/config';

@Injectable()
export class Urlnterceptor implements HttpInterceptor {

  config = config;
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newrequest = request.clone({
      url : this.config.serverUrl + request.url,
    });
    return next.handle(newrequest);
  }
}
