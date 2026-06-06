import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Investment } from '../../../core/services/investment';

@Component({
  selector: 'app-investment-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './investment-modal.html',
  styleUrl: './investment-modal.scss',
})
export class InvestmentModal {
  @Input() mode: 'holding' | 'trade' = 'holding';

  @Output() close = new EventEmitter<void>();
  @Output() investmentCreated = new EventEmitter<void>();

  loading = false;

  formData = {
    name: '',
    invested: '',
    current: '',
    entry: '',
    exit: '',
    quantity: '',
    type: '',
  };

  constructor(private investmentService: Investment) {}

  closeModal() {
    this.close.emit();
  }

  calculatePnL(): number {
    if (
      !this.formData.entry ||
      !this.formData.exit ||
      !this.formData.quantity ||
      !this.formData.type
    ) {
      return 0;
    }

    const entry = Number(this.formData.entry);
    const exit = Number(this.formData.exit);
    const qty = Number(this.formData.quantity);

    return this.formData.type === 'BUY'
      ? (exit - entry) * qty
      : (entry - exit) * qty;
  }

  createInvestment() {
    this.loading = true;

    if (this.mode === 'holding') {
      this.investmentService
        .createInvestment({
          name: this.formData.name,
          invested: this.formData.invested,
          current: this.formData.current,
        })
        .subscribe({
          next: () => {
            this.loading = false;
            this.investmentCreated.emit();
            this.closeModal();
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
        });

      return;
    }

    const trade = {
      name: this.formData.name,
      type: this.formData.type,
      entry: Number(this.formData.entry),
      exit: Number(this.formData.exit),
      quantity: Number(this.formData.quantity),
      pnl: this.calculatePnL(),
    };

    this.investmentService.createTrade(trade).subscribe({
      next: () => {
        this.loading = false;
        this.investmentCreated.emit();
        this.closeModal();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }
}