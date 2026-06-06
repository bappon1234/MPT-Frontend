import { Component, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Setting } from '../../core/services/setting';

@Component({
  selector: 'app-settings',
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any;

  isDarkMode = true;

  constructor(
    private settingService: Setting
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.loadProfile();
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

  loadProfile() {

    this.settingService
      .getProfile()
      .subscribe({

        next: (res: any) => {

          this.user = res.user;

        },

        error: err => {

          console.log(err);

        }

      });

  }

  saveProfile() {

    const data = {

      name: this.user.name,

      email: this.user.email

    };

    this.settingService
      .updateProfile(data)
      .subscribe({

        next: (res: any) => {

          localStorage.setItem(
            'user',
            JSON.stringify(res.user)
          );

          alert(
            'Profile updated successfully'
          );

        },

        error: err => {

          console.log(err);

        }

      });

  }

  switchPlan(plan: string) {

    if (plan === 'FREE') {
      this.user.plan = 'FREE';
      localStorage.setItem('user', JSON.stringify(this.user));
      return;
    }

    // PRO redirect ONLY (no plan now)
    localStorage.setItem('selectedPlanType', plan);

    window.location.href = `/checkout?type=PRO`;
  }
}
