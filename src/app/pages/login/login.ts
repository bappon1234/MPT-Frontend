import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  loading = false;

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  async login() {
    try{
      this.loading = true;
      const res = await this.authService.login({
        email: this.email,
        password: this.password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      this.router.navigate(['/dashboard']);
    }catch(error: any){
      console.log(error);
      alert(error.response?.data?.message);
    }
    finally{
      this.loading = false;
    }
  }
}
