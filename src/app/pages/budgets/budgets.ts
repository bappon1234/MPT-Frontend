import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { BudgetModal } from './budget-modal/budget-modal';
import { Budget } from '../../core/services/budget';

type ModalMode = 'add' | 'edit' | 'fund';

@Component({
  selector: 'app-budgets',
  imports: [Sidebar, CommonModule, BudgetModal],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
})
export class Budgets {

  @ViewChild(Sidebar) sidebar!: Sidebar;

  user: any;
  budgets: any[] = [];

  showModal = false;

  modalMode: ModalMode = 'add';
  selectedBudget: any = null;

  loading = true;
  isDarkMode = true;

  constructor(
    private budgetService: Budget,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) this.user = JSON.parse(userData);

    this.getBudgets();
  }

  // =========================
  // OPEN MODALS
  // =========================

  openAddModal() {
    this.modalMode = 'add';
    this.selectedBudget = null;
    this.showModal = true;
  }

  openEditModal(budget: any) {
    this.modalMode = 'edit';
    this.selectedBudget = budget;
    this.showModal = true;
  }

  openFundModal(budget: any) {
    this.modalMode = 'fund';
    this.selectedBudget = budget;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // =========================
  // DATA
  // =========================

  getBudgets() {
    this.loading = true;

    this.budgetService.getAllBudget().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.budgets = res.budgets;
          this.loading = false;
          this.cdr.detectChanges();
        }, 500);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deleteBudget(id: string) {
    if (!confirm('Delete budget?')) return;

    this.budgetService.deleteBudget(id).subscribe({
      next: (res) => {
        alert(res.message);
        this.getBudgets();
      },
      error: (err) => alert(err.error.message)
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}