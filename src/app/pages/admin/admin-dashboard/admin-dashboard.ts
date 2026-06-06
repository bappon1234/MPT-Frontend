import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Admin } from '../../../core/services/admin';
import { Sidebar } from '../../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanRequest } from '../../../core/services/plan-request';
import { firstValueFrom } from 'rxjs';
import { PlanPriceService } from '../../../core/services/plan-price';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];

  user: any = null;

  isDarkMode = true;
  loading = false;

  searchTerm = '';
  selectedPlan = 'ALL';
  activeTab = 'users';

  totalEarnings = 0;

  priceForm = {
    plan: 'SIX_MONTH',
    price: 0
  };

  planPrices: any[] = [];
  planRequests: any[] = [];

  totalUsers = 0;
  premiumUsers = 0;
  freeUsers = 0;

  selectedImage = '';

  constructor(
    private adminService: Admin,
    private planRequestService: PlanRequest,
    private planPriceService: PlanPriceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    this.loadUsers();
    this.loadPlanRequests();
    this.loadPlanPrices();
  }

  // ================= IMAGE =================
  openImage(image: string) {
    this.selectedImage = image;
  }

  closeImage() {
    this.selectedImage = '';
  }

  // ================= THEME =================
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    document.body.classList.toggle('light-theme', !this.isDarkMode);
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  // ================= USERS =================
  async loadUsers() {
    try {
      this.loading = true;

      const data = await this.adminService.getAllUsers();
      this.users = data || [];

      this.totalUsers = this.users.length;

      this.freeUsers = this.users.filter(u => u.plan === 'FREE').length;

      this.premiumUsers = this.users.filter(u =>
        ['SIX_MONTH', 'ONE_YEAR', 'LIFETIME'].includes(u.plan)
      ).length;

      this.filterUsers();
      this.cdr.detectChanges();

    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  filterUsers() {
    let data = [...this.users];

    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();

      data = data.filter(u =>
        u.name?.toLowerCase().includes(search) ||
        u.email?.toLowerCase().includes(search)
      );
    }

    if (this.selectedPlan !== 'ALL') {
      data = data.filter(u => u.plan === this.selectedPlan);
    }

    this.filteredUsers = data;
  }

  async changePlan(userId: string, currentPlan: string) {
    try {
      const newPlan = currentPlan === 'FREE' ? 'SIX_MONTH' : 'FREE';

      await this.adminService.changeUserPlan(userId, newPlan);

      await this.loadUsers();

    } catch (err) {
      console.error('Plan update failed:', err);
    }
  }

  async deleteUser(userId: string) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      await this.adminService.deleteUser(userId);
      await this.loadUsers();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  trackByUser(index: number, user: any) {
    return user.id;
  }

  // ================= PLAN REQUESTS =================
async loadPlanRequests() {
  try {
    const data = await firstValueFrom(
      this.planRequestService.getAllRequests()
    );

    this.planRequests = data || [];

    // 🔥 FIX NG0100
    queueMicrotask(() => {
      this.calculateEarnings();
      this.cdr.detectChanges();
    });

  } catch (err) {
    console.error(err);
  }
}

  async approveRequest(id: string) {
    try {
      await firstValueFrom(
        this.planRequestService.approveRequest(id)
      );

      await this.loadPlanRequests();
      await this.loadUsers();

    } catch (err) {
      console.error('Approve failed:', err);
    }
  }

  async rejectRequest(id: string) {
    try {
      await firstValueFrom(
        this.planRequestService.rejectRequest(id)
      );

      await this.loadPlanRequests();

    } catch (err) {
      console.error('Reject failed:', err);
    }
  }

  // ================= EARNINGS =================
  calculateEarnings() {
    if (!this.planRequests.length) {
      this.totalEarnings = 0;
      return;
    }

    this.totalEarnings = this.planRequests
      .filter(r => r.status === 'APPROVED')
      .reduce((sum, r) => {

        const plan = (r.plan || '').toUpperCase();

        if (plan === 'SIX_MONTH') return sum + 499;
        if (plan === 'ONE_YEAR') return sum + 999;
        if (plan === 'LIFETIME') return sum + 1999;

        return sum;
      }, 0);
  }

  // ================= PLAN PRICES =================
  async loadPlanPrices() {
    try {
      const data = await firstValueFrom(
        this.planPriceService.getPlanPrices()
      );

      this.planPrices = data || [];

    } catch (err) {
      console.error('Failed to load plan prices:', err);
    }
  }

async savePrice() {
  try {
    await firstValueFrom(
      this.planPriceService.upsertPlanPrice(this.priceForm)
    );

    alert('Price Updated Successfully');

    this.priceForm = {
      plan: 'SIX_MONTH',
      price: 0
    };

    await this.loadPlanPrices(); // reload updated data

  } catch (err) {
    console.error('Save price failed:', err);
  }
}
}