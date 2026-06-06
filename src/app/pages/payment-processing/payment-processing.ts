import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanRequest } from '../../core/services/plan-request';
import { PlanPriceService } from '../../core/services/plan-price';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-processing',
  standalone: true,
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './payment-processing.html',
  styleUrl: './payment-processing.scss',
})
export class PaymentProcessing implements OnInit {

  @ViewChild(Sidebar) sidebar!: Sidebar;

  user: any;
  isDarkMode = true;

  selectedPlan: string = '';
  amount: number = 0;
  utr: string = '';
  selectedFile: File | null = null;

  priceMap: any = {};

  constructor(
    private planRequestService: PlanRequest,
    private planPriceService: PlanPriceService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) this.user = JSON.parse(userData);

    this.selectedPlan =
      (localStorage.getItem('selectedPlanType') || '').toUpperCase();

    await this.loadPrices();
  }

  // ================= LOAD PRICES =================
  async loadPrices() {
    try {
      const data = await firstValueFrom(
        this.planPriceService.getPlanPrices()
      );

      this.priceMap = {};

      (data || []).forEach((p: any) => {
        this.priceMap[p.plan?.toUpperCase()] = Number(p.price);
      });

      // 🔥 FIX: set amount after data load
      this.amount = this.priceMap[this.selectedPlan] ?? 0;
      this.cdr.detectChanges()

    } catch (err) {
      console.error('Failed to load prices', err);
      this.amount = 0;
    }
  }

  // ================= FILE SELECT =================
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // ================= SUBMIT =================
  submitRequest() {

    if (!this.selectedPlan) {
      alert('Plan not selected');
      return;
    }

    const formData = new FormData();

    formData.append('plan', this.selectedPlan);
    formData.append('utr', this.utr);
    formData.append('amount', String(this.amount));

    if (this.selectedFile) {
      formData.append('screenshot', this.selectedFile);
    }

    this.planRequestService.createPlanRequest(formData)
      .subscribe({
        next: () => {
          alert('Payment submitted successfully');
          this.router.navigate(['/payment-success']);
        },
        error: (err) => {
          console.error(err);
          alert('Payment submission failed');
        }
      });
  }

  // ================= THEME =================
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}