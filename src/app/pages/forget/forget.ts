import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forget.html',
  styleUrl: './forget.scss',
})
export class Forget {
  email= '';
  loading = false;

  constructor(private authService: Auth){}

  async forgotPassword(){
    try{
      this.loading = true;

      const res = await this.authService.forgotPassword({
        email: this.email
      });
      alert(res.data.message);
    }catch(error: any){
      console.log(error);
      alert(error.response?.data?.message);
    }
    finally{
      this.loading = false;
    }
  }

}
