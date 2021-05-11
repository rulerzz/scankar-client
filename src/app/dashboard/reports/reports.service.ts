import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {
  }
  stats(id: any): Observable<any> {
    return this.http.get<any>('statistic/' + id, {
      observe: 'response',
    });
  }
}
