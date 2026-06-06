import { Component, OnInit } from '@angular/core';

import { Auth } from '../../core/services/auth';

import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register implements OnInit {

  name = '';
  email = '';
  password = '';

  loading = false;

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

ngOnInit(): void {

  setTimeout(() => {

    if (typeof google === 'undefined') {
      console.error('Google SDK not loaded');
      return;
    }

    google.accounts.id.initialize({

      client_id:
        '367312356622-vvgjc1l5q6pcrfla28qfipki1vd9jaqh.apps.googleusercontent.com',

      callback: async (response: any) => {

        try {

          const res = await this.authService.googleLogin(
            response.credential
          );

          localStorage.setItem(
            'token',
            res.data.token
          );

          localStorage.setItem(
            'user',
            JSON.stringify(res.data.user)
          );

          this.router.navigate(['/dashboard']);

        } catch (error) {

          console.log(error);

        }
      }
    });

  }, 1000);
}

  async register() {

    try {

      this.loading = true;

      const res = await this.authService.register({

        name: this.name,
        email: this.email,
        password: this.password

      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      this.router.navigate(['/dashboard']);

    } catch (error: any) {

      console.log(error);

      alert(error.response?.data.message);

    } finally {

      this.loading = false;
    }
  }

  loginWithGoogle() {

    google.accounts.id.prompt();
  }
}