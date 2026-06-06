import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { PlanPriceService } from '../../core/services/plan-price';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {

  @ViewChild(Sidebar) sidebar!: Sidebar;

  user: any;
  selectedPlan = '';
  isDarkMode = true;

  plans: any[] = [];
  priceMap: any = {};

  constructor(
    private planPriceService: PlanPriceService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    const userData = localStorage.getItem('user');
    if (userData) this.user = JSON.parse(userData);

    this.selectedPlan =
      localStorage.getItem('selectedPlanType') || '';

    await this.loadPlansFromAdmin();
  }

  // ================= LOAD PRICES =================
  async loadPlansFromAdmin() {
    try {
      const data = await firstValueFrom(
        this.planPriceService.getPlanPrices()
      );

      this.priceMap = {};

      (data || []).forEach((p: any) => {
        this.priceMap[p.plan] = p.price;
      });

      // 🔥 IMPORTANT FIX: rebuild instantly
      this.buildPlans();

      // force UI refresh
      this.cdr.detectChanges();

    } catch (err) {
      console.error('Failed to load prices', err);
    }
  }

  // ================= BUILD UI =================
  buildPlans() {

    this.plans = [
      {
        key: 'SIX_MONTH',
        title: '6 Months Pro',
        price: this.priceMap['SIX_MONTH'] ?? 0,
        desc: 'Best for short term growth',
        features: [
          'Unlimited expense tracking',
          'Advanced analytics',
          'AI insights',
          'Priority support'
        ]
      },
      {
        key: 'ONE_YEAR',
        title: '1 Year Pro',
        price: this.priceMap['ONE_YEAR'] ?? 0,
        desc: 'Most popular',
        features: [
          'Everything in 6 Months',
          'AI assistant',
          'Reports export',
          'No ads'
        ]
      },
      {
        key: 'LIFETIME',
        title: 'Lifetime Pro',
        price: this.priceMap['LIFETIME'] ?? 0,
        desc: 'One-time payment',
        features: [
          'All features',
          'Lifetime access',
          'VIP support'
        ]
      }
    ];
  }

  // ================= SELECT =================
  selectPlan(planKey: string) {
    this.selectedPlan = planKey;
  }

  // ================= PAYMENT =================
  payNow() {
    if (!this.selectedPlan) {
      alert('Select a plan first!');
      return;
    }

    localStorage.setItem('selectedPlanType', this.selectedPlan);

    window.location.href = '/payment-processing';
  }

  // ================= THEME =================
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    document.body.classList.toggle('light-theme', !this.isDarkMode);
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }
}