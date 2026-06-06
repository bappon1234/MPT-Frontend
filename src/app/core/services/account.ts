import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Account {
  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient){}

  private getHeaders(){
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  createAccount(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, data, this.getHeaders());
  }

  getAllAccount(){
    return this.http.get(`${this.apiUrl}/get`, this.getHeaders());
  }

  updateAccount(id: string, data: any){
    return this.http.put(`${this.apiUrl}/update/${id}`, data, this.getHeaders());
  }

  deleteAccount(id: string){
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }

}
