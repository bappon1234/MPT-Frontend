import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root',
})
export class Auth {
  API = "http://localhost:5000/api/auth";

  async register(data:any){
    return await axios.post(`${this.API}/register`, data);
  }

  async login(data:any){
    return await axios.post(`${this.API}/login`, data);
  }

  async googleLogin(token: string){
    return await axios.post(`${this.API}/google`, {token});
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async forgotPassword(data: any) {
  return await axios.post(`${this.API}/forgot-password`, data );
  }

    async verifyOtp(data: any) {
    return await axios.post(`${this.API}/verify-otp`, data);
  }

  async resetPassword(data: any) {
    return await axios.post(`${this.API}/reset-password`, data);
  }


  getToken(){
    return localStorage.getItem("token");
  }

  isLogedIn(){
    return !!localStorage.getItem("token");
  }
}
