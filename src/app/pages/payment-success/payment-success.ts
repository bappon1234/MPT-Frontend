import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-payment-success',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.scss',
})
export class PaymentSuccess {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;
  user: any;
  isDarkMode = true;
  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user')!);

    localStorage.setItem('user', JSON.stringify(user));
  }

  goToDashboard() {
    window.location.href = '/dashboard';
  }


  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
}
