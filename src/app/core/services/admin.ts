import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Admin {
   private apiUrl = `${environment.apiUrl}/admin`;

  getToken(){
    return localStorage.getItem('token');
  }

  getHeaders(){
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    };
  }

  async getAllUsers(){
    try{
      const response = await axios.get(`${this.apiUrl}/users`, this.getHeaders());
      return response.data;
    }catch(error:any){
      console.log(error.response?.data || error);
      throw error;
    }
  }

   async changeUserPlan(userId: string, plan: string){

    try{

      const response = await axios.put(
        `${this.apiUrl}/plan/${userId}`,
        { plan },
        this.getHeaders()
      );

      return response.data;

    }catch(error: any){

      console.log(error.response?.data || error);

      throw error;

    }

  }

   async deleteUser(userId: string){

    try{

      const response = await axios.delete(
        `${this.apiUrl}/user/${userId}`,
        this.getHeaders()
      );

      return response.data;

    }catch(error: any){

      console.log(error.response?.data || error);

      throw error;

    }

  }
}
