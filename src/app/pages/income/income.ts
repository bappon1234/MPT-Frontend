import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Income } from '../../core/services/income';
import { FormsModule } from '@angular/forms';
import { IncomeModal } from './income-modal/income-modal';


@Component({
  selector: 'app-income',
  standalone: true,
  imports: [Sidebar, CommonModule, FormsModule, IncomeModal],
  templateUrl: './income.html',
  styleUrl: './income.scss',
})
export class IncomeComponent implements OnInit {
  @ViewChild(Sidebar) sidebar!: Sidebar;
  isDarkMode = true;

  incomes: any[] = [];
  user: any;

  showModal = false;
  editMode = false;
  editData: any = null;

  searchText = '';
  selectedCategory = 'All';

  constructor(
    private incomeService: Income,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) this.user = JSON.parse(userData);

    this.loadIncomes();
  }

  loadIncomes() {
    this.incomeService.getIncomes().subscribe({
      next: (res: any) => {
        this.incomes = res?.incomes || [];
        this.cdr.detectChanges();
      },
      error: () => this.incomes = []
    });
  }

  openModal() {
    this.editMode = false;
    this.editData = null;
    this.showModal = true;
  }

  openEditModal(inc: any) {
    this.editMode = true;
    this.editData = { ...inc };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSaved() {
    this.loadIncomes();
    this.showModal = false;
  }

deleteIncome(id: string) {
  if (!confirm('Delete income?')) return;

  this.incomeService.deleteIncome(id).subscribe({
    next: () => {
      this.incomes = this.incomes.filter(
        income => income.id !== id
      );

      this.cdr.detectChanges();
    },

    error: (err) => {
      console.log('DELETE ERROR =>', err);
    }
  });
}

  filteredIncomes() {
    return this.incomes.filter(i => {
      return (
        i.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.selectedCategory === 'All' || i.source === this.selectedCategory)
      );
    });
  }

  getTotalIncome() {
    return this.incomes.reduce((s, i) => s + (i.amount || 0), 0);
  }

  getMonthlyIncome() {
    const m = new Date().getMonth();
    return this.incomes
      .filter(i => new Date(i.date).getMonth() === m)
      .reduce((s, i) => s + (i.amount || 0), 0);
  }

  getAverageIncome() {
    return this.incomes.length ? this.getTotalIncome() / this.incomes.length : 0;
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