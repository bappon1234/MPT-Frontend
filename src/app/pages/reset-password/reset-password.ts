import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  newPassword = '';
  confirmPassword = '';

  loading = false;

  email = localStorage.getItem('resetEmail');

  constructor(private authService: Auth,
    private router: Router
  ){}

  async resetPassword(){
    try{
      if(this.newPassword !== this.confirmPassword){
        alert('Password do not match');
        return;
      }

      this.loading = true;

      const res = await this.authService.resetPassword({
        email: this.email,
        newPassword: this.newPassword,
      });
      alert(res.data.message);

      localStorage.removeItem('resetEmail');

      this.router.navigate(['/login']);
    }catch (error: any){
      console.log(error);

      alert(error.response?.data?.message);
    } finally{
      this.loading = false;
    }
  }
}
