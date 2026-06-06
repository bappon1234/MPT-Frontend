import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../../core/services/expense';

@Component({
  selector: 'app-expense-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-modal.html',
  styleUrl: './expense-modal.scss',
})
export class ExpenseModal {
  
  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();

  form = {
    title: '',
    amount: '',
    category: '',
    type: 'EXPENSE',
    note: ''
  };

  constructor(private expenseService: Expense) {}

createExpense() {
  this.expenseService.createExpense(this.form).subscribe({
    next: () => {
      this.saved.emit();
    },
    error: (err) => {
      console.log(err);
      console.log(err.error); // important
    }
  });
}
}
