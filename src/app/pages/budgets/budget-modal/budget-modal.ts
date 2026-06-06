import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Budget } from '../../../core/services/budget';

type ModalMode = 'add' | 'edit' | 'fund';

@Component({
  selector: 'app-budget-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './budget-modal.html',
  styleUrl: './budget-modal.scss',
})
export class BudgetModal implements OnInit {

  @Input() mode: ModalMode = 'add';
  @Input() budgetToEdit: any = null;

  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  loading = false;

  budgetData = {
    category: '',
    limit: '',
    month: '',
    year: new Date().getFullYear()
  };

  fundAmount: number = 0;

  constructor(private budgetService: Budget) {}

  // =========================
  // INIT (SAFE)
  // =========================
  ngOnInit(): void {
    if (this.mode === 'edit' || this.mode === 'fund') {

      if (this.budgetToEdit) {
        this.budgetData = {
          category: this.budgetToEdit.category ?? '',
          limit: this.budgetToEdit.limit ?? '',
          month: this.budgetToEdit.month ?? '',
          year: this.budgetToEdit.year ?? new Date().getFullYear()
        };
      }
    }

    // reset fund
    this.fundAmount = 0;
  }

  // =========================
  // CLOSE MODAL
  // =========================
  closeModal(): void {
    this.close.emit();
  }

  // =========================
  // MAIN SUBMIT HANDLER
  // =========================
  submit(): void {

    // ================= ADD / EDIT =================
    if (this.mode === 'add' || this.mode === 'edit') {

      if (
        !this.budgetData.category ||
        !this.budgetData.limit ||
        !this.budgetData.month
      ) {
        alert('Please fill all fields');
        return;
      }

      this.loading = true;

      const id = this.budgetToEdit?.id || this.budgetToEdit?._id;

      const request =
        this.mode === 'add'
          ? this.budgetService.createBudget(this.budgetData)
          : this.budgetService.updateBudget(id, this.budgetData);

      request.subscribe({
        next: (res) => {
          this.loading = false;
          this.closeModal();
          this.refresh.emit();
        },
        error: (err) => {
          this.loading = false;
          alert(err?.error?.message || 'Something went wrong');
        }
      });

      return; // IMPORTANT STOP
    }

    // ================= FUND =================
    if (this.mode === 'fund') {

      if (!this.fundAmount || this.fundAmount <= 0) {
        alert('Enter valid fund amount');
        return;
      }

      const id = this.budgetToEdit?.id || this.budgetToEdit?._id;

      if (!id) {
        alert('Invalid budget selected');
        return;
      }

      this.loading = true;

      const newSpent =
        Number(this.budgetToEdit.spent || 0) +
        Number(this.fundAmount);

      this.budgetService.updateBudget(id, {
        spent: newSpent
      }).subscribe({
        next: () => {
          this.loading = false;
          this.closeModal();
          this.refresh.emit();
        },
        error: (err) => {
          this.loading = false;
          alert(err?.error?.message || 'Update failed');
        }
      });

      return;
    }
  }
}