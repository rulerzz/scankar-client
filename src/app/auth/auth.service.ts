import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: any): Observable<any> {
    return this.http.post<any>('userlogin', data, {
      observe: 'response',
    });
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
