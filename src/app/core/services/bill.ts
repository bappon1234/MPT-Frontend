import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Bill {
  private apiUrl = `${environment.apiUrl}/bills`;

  constructor(private http: HttpClient){}

  private getHeaders(){
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  createBills(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, data, this.getHeaders());
  }

  getAllBills(){
    return this.http.get(`${this.apiUrl}/get`, this.getHeaders());
  }

  updateBills(id: string, data: any){
    return this.http.put(`${this.apiUrl}/update/${id}`, data, this.getHeaders());
  }

  deleteBills(id: string){
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }
  
}
