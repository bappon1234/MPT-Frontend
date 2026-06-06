import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Expense } from '../../core/services/expense';
import { ExpenseModal } from './expense-modal/expense-modal';

@Component({
  selector: 'app-expenses',
  imports: [CommonModule, FormsModule, Sidebar, ExpenseModal],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class Expenses {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any;
  expenses: any[] = [];
  showModal = false;

  form = {
    title: '',
    amount: '',
    category: '',
    type: 'EXPENSE',
    note: ''
  };

  isDarkMode = true;


  constructor(private expenseService: Expense,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.loadExpenses();
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

  openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

onExpenseCreated() {
    console.log('REFRESHING...');
  this.loadExpenses();
  this.closeModal();
}

loadExpenses() {
  this.expenseService.getExpenses().subscribe({
    next: (res: any) => {

      this.expenses = res.expenses || [];
      this.cdr.detectChanges();
    },
    error: err => console.log(err)
  });
}

  addExpense() {
    this.expenseService.createExpense(this.form).subscribe({
      next: () => {
        this.loadExpenses();
        this.form = { title: '', amount: '', category: '', type: 'EXPENSE', note: '' };
      },
      error: err => console.log(err)
    });
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => this.loadExpenses(),
      error: err => console.log(err)
    });
  }

  getTotalExpense() {
  return this.expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );
}

getMonthlyExpense() {
  const month = new Date().getMonth();

  return this.expenses
    .filter(
      e =>
        new Date(e.date).getMonth() === month
    )
    .reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );
}

getAverageExpense() {
  return this.expenses.length
    ? this.getTotalExpense() /
        this.expenses.length
    : 0;
}
}