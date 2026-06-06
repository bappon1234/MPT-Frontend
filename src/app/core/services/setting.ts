import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Setting {
  private apiUrl = `${environment.apiUrl}/settings`;

  constructor(private http: HttpClient){}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }
  }


  getProfile() {
    return this.http.get(
      `${this.apiUrl}/profile`,
      this.getHeaders()
    );
  }

  updateProfile(data: any) {
    return this.http.put(
      `${this.apiUrl}/profile`,
      data,
      this.getHeaders()
    );
  }

  updatePlan(plan: string) {
    return this.http.put(
      `${this.apiUrl}/plan`,
      { plan },
      this.getHeaders()
    );
  }
}
