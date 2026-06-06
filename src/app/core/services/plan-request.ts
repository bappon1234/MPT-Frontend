import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanRequest {
    private apiUrl =
    'http://localhost:5000/api/plan-request';

  constructor(
    private http: HttpClient
  ) { }

  createPlanRequest(
    formData: FormData
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create`,
      formData
    );

  }

  getMyRequests(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/my-requests`
    );

  }

  getAllRequests(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/admin/all`
    );

  }

  approveRequest(id: string) {

    return this.http.put(
      `${this.apiUrl}/admin/approve/${id}`,
      {}
    );

  }

  rejectRequest(id: string) {

    return this.http.put(
      `${this.apiUrl}/admin/reject/${id}`,
      {}
    );

  }
}
