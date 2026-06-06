import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { InvestmentModal } from './investment-modal/investment-modal';
import { Investment } from '../../core/services/investment';

@Component({
  selector: 'app-investments',
  imports: [Sidebar, CommonModule, InvestmentModal],
  templateUrl: './investments.html',
  styleUrl: './investments.scss',
})
export class Investments {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  Math = Math;

  user: any;
  investments: any[] = [];

  showModal = false;
  modalMode: 'holding' | 'trade' = 'holding';

  totalInvested = 0;
  totalCurrent = 0;
  totalProfit = 0;
  returnPercentage = 0;

  trades: any[] = [];

  activeTab: 'holdings' | 'journal' = 'holdings';

  isDarkMode = true;

  constructor(private investmentService: Investment,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) this.user = JSON.parse(userData);

    this.getInvestments();
    this.getTrades();
  }

  refreshData() {
    this.getInvestments();
    this.getTrades();
    this.closeModal();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    document.body.classList.toggle('light-theme', !this.isDarkMode);
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  changeTab(tab: 'holdings' | 'journal') {
    this.activeTab = tab;
    this.showModal = false;
  }

  openModal() {
    this.modalMode = this.activeTab === 'holdings' ? 'holding' : 'trade';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getInvestments() {
    this.investmentService.getAllInvestment().subscribe({
      next: (res: any) => {
        this.investments = res.investments;
        this.calculateStats();
        this.cdr.detectChanges()
      },
      error: (err) => console.log(err)
    });
  }

  calculateStats() {
    this.totalInvested = 0;
    this.totalCurrent = 0;

    this.investments.forEach(item => {
      this.totalInvested += Number(item.invested);
      this.totalCurrent += Number(item.current);
    });

    this.totalProfit = this.totalCurrent - this.totalInvested;

    this.returnPercentage =
      this.totalInvested > 0
        ? (this.totalProfit / this.totalInvested) * 100
        : 0;
  }

  deleteInvestment(id: string) {
    if (!confirm('Delete investment?')) return;

    this.investmentService.deleteInvestment(id).subscribe({
      next: () => {
        this.getInvestments();
      },
      error: (err) => console.log(err)
    });
  }

  getTrades() {
    this.investmentService.getAllTrades().subscribe({
      next: (res: any) => {
        this.trades = res.trades || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('TRADE ERROR =>', err);
      }
    });
  }

  deleteTrade(id: string) {
  if (!confirm('Delete trade?')) return;

  this.investmentService.deleteTrade(id).subscribe({
    next: () => {
      this.getTrades();
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}