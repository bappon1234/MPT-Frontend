import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp {
  otp1 = '';
  otp2 = '';
  otp3 = '';
  otp4 = '';
  otp5 = '';
  otp6 = '';

  loading = false;

  email = localStorage.getItem('resetEmail');

  constructor(
    private authService: Auth,
    private router: Router
  ) { }

moveNext(event: any) {

  const input = event.target;

  // NEXT INPUT
  if (input.value.length === 1) {

    const next =
      input.nextElementSibling as HTMLInputElement;

    if (next) {
      next.focus();
    }
  }

  // PREVIOUS INPUT
  if (
    event.inputType === 'deleteContentBackward' &&
    input.value.length === 0
  ) {

    const prev =
      input.previousElementSibling as HTMLInputElement;

    if (prev) {
      prev.focus();
    }
  }
}

  async verifyOtp() {

    try {

      this.loading = true;

      const otp =
        this.otp1 +
        this.otp2 +
        this.otp3 +
        this.otp4 +
        this.otp5 +
        this.otp6;

      const res =
        await this.authService.verifyOtp({

          email: this.email,

          otp: otp
        });

      alert(res.data.message);

      this.router.navigate(['/reset-password']);

    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.message
      );

    } finally {

      this.loading = false;
    }
  }

  async resendOtp() {

    try {

      const res =
        await this.authService.forgotPassword({

          email: this.email
        });

      alert(res.data.message);

    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.message
      );
    }
  }
}
