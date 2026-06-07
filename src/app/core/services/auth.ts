import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
 private apiUrl = `${environment.apiUrl}/auth`;

  async register(data:any){
    return await axios.post(`${this.apiUrl}/register`, data);
  }

  async login(data:any){
    return await axios.post(`${this.apiUrl}/login`, data);
  }

  async googleLogin(token: string){
    return await axios.post(`${this.apiUrl}/google`, {token});
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async forgotPassword(data: any) {
  return await axios.post(`${this.apiUrl}/forgot-password`, data );
  }

    async verifyOtp(data: any) {
    return await axios.post(`${this.apiUrl}/verify-otp`, data);
  }

  async resetPassword(data: any) {
    return await axios.post(`${this.apiUrl}/reset-password`, data);
  }


  getToken(){
    return localStorage.getItem("token");
  }

  isLogedIn(){
    return !!localStorage.getItem("token");
  }
}
