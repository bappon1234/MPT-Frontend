import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  API = "http://localhost:5000/api/admin";

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
      const response = await axios.get(`${this.API}/users`, this.getHeaders());
      return response.data;
    }catch(error:any){
      console.log(error.response?.data || error);
      throw error;
    }
  }

   async changeUserPlan(userId: string, plan: string){

    try{

      const response = await axios.put(
        `${this.API}/plan/${userId}`,
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
        `${this.API}/user/${userId}`,
        this.getHeaders()
      );

      return response.data;

    }catch(error: any){

      console.log(error.response?.data || error);

      throw error;

    }

  }
}
