import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Expense {
  private apiUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  createExpense(data: any) {
    return this.http.post(
      `${this.apiUrl}/create`,
      data,
      this.getHeaders()
    );
  }

  // GET ALL
  getExpenses() {
    return this.http.get(
      `${this.apiUrl}/get`,
      this.getHeaders()
    );
  }

  // DELETE
  deleteExpense(id: string) {
    return this.http.delete(
      `${this.apiUrl}/delete/${id}`,
      this.getHeaders()
    );
  }

}
