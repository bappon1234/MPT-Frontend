import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Income {
    private apiUrl = `${environment.apiUrl}/income`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

    // CREATE
  createIncome(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data, this.getHeaders());
  }

  // GET ALL
  getIncomes() {
    return this.http.get(`${this.apiUrl}/get`, this.getHeaders());
  }

  // GET SINGLE
  getSingleIncome(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // UPDATE
  updateIncome(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, this.getHeaders());
  }

  // DELETE
  deleteIncome(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }
}
