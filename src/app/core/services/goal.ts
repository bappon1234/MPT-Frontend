import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Goal {
   private apiUrl = `${environment.apiUrl}/goals`;

  constructor(private http: HttpClient){}

  private getHeaders(){
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  createGoal(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, data, this.getHeaders());
  }

  getGoals(){
    return this.http.get(`${this.apiUrl}/get`, this.getHeaders());
  }

  updateGoal(id: string, data:any){
    return this.http.put(`${this.apiUrl}/update/${id}`, data, this.getHeaders());
  }

  deleteGoal(id: string){
    return this.http.delete(`${this.apiUrl}/delete/${id}`, this.getHeaders());
  }
}
