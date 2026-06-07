import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Budget {
   private apiUrl = `${environment.apiUrl}/budgets`;

  constructor(private http: HttpClient){}

  createBudget(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  getAllBudget(): Observable<any>{
    return this.http.get(`${this.apiUrl}/all`);
  }

  updateBudget(id: string, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}

  deleteBudget(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

}
