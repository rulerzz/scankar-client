import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config/config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  config = config;
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // add auth header with jwt if user is logged in and request is to api url
      let tempdata : any = localStorage.getItem('userdata');
      const currentUser = JSON.parse(tempdata);
      const token = localStorage.getItem('token');
      const isLoggedIn = currentUser && token;
      const isApiUrl = request.url.startsWith(this.config.serverUrl);
      if (isLoggedIn && isApiUrl) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${token}`
              }
          });
      }
      return next.handle(request);
  }
}
