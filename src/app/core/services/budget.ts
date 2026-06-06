import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Budget {
  private api = "http://localhost:5000/api/budgets";

  constructor(private http: HttpClient){}

  createBudget(data: any): Observable<any>{
    return this.http.post(`${this.api}/create`, data);
  }

  getAllBudget(): Observable<any>{
    return this.http.get(`${this.api}/all`);
  }

  updateBudget(id: string, data: any): Observable<any> {
  return this.http.put(`${this.api}/${id}`, data);
}

  deleteBudget(id: string): Observable<any>{
    return this.http.delete(`${this.api}/delete/${id}`);
  }

}
