import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanPriceService {

   private apiUrl = `${environment.apiUrl}/plan-price`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`
      })
    };
  }

  // GET ALL PRICES
  getPlanPrices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  // UPSERT PRICE
  upsertPlanPrice(data: { plan: string; price: number }): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/upsert`,
      data,
      this.getHeaders()
    );
  }
}