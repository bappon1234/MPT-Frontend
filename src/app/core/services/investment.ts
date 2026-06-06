import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Investment {
  private apiUrl = 'http://localhost:5000/api/investments';
  private tradeUrl = 'http://localhost:5000/api/trades';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  createInvestment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data, this.getHeaders());
  }

  getAllInvestment(){
    return this.http.get(`${this.apiUrl}/get`, this.getHeaders());
  }

  updateInvestment(id: string, data: any){
    return this.http.put(`${this.apiUrl}/update/${id}`, data, this.getHeaders());
  }

  deleteInvestment(id:string){
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }

  createTrade(data: any): Observable<any> {
    return this.http.post(
      `${this.tradeUrl}/create`,
      data,
      this.getHeaders()
    );
  }

  getAllTrades(): Observable<any> {
    return this.http.get(
      `${this.tradeUrl}/get`,
      this.getHeaders()
    );
  }

  deleteTrade(id: string): Observable<any> {
    return this.http.delete(
      `${this.tradeUrl}/delete/${id}`,
      this.getHeaders()
    );
  }
}
