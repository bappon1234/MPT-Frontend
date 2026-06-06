import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

type FinanceToolType =
  | 'emi'
  | 'sip'
  | 'fd'
  | 'tax';

@Component({
  selector: 'app-finance-tools',
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './finance-tools.html',
  styleUrl: './finance-tools.scss',
})
export class FinanceTools {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any;
  isDarkMode = true;

  activeTool: FinanceToolType = 'emi';

  /* EMI */
  loanAmount = 500000;
  interestRate = 8.5;
  loanYears = 5;
  emiResult = 0;
  totalInterest = 0;
  totalPayment = 0;

  /* SIP */
  sipMonthly = 5000;
  sipReturn = 12;
  sipYears = 10;
  sipMaturity = 0;
  sipInvested = 0;
  sipGain = 0;

  /* FD */
  fdAmount = 100000;
  fdRate = 7;
  fdYears = 5;
  fdMaturity = 0;
  fdInterest = 0;

  /* TAX */
  annualIncome = 1000000;
  taxAmount = 0;
  netIncome = 0;

  setTool(tool: FinanceToolType) {
  this.activeTool = tool;
}

  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }

      this.calculateEMI();
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

  calculateEMI() {

    const p = this.loanAmount;
    const r = this.interestRate / 12 / 100;
    const n = this.loanYears * 12;

    this.emiResult =
      (p * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    this.totalPayment =
      this.emiResult * n;

    this.totalInterest =
      this.totalPayment - p;
  }

  calculateSIP() {

    const r =
      this.sipReturn / 12 / 100;

    const n =
      this.sipYears * 12;

    this.sipMaturity =
      this.sipMonthly *
      (((Math.pow(1 + r, n) - 1) / r) *
        (1 + r));

    this.sipInvested =
      this.sipMonthly * n;

    this.sipGain =
      this.sipMaturity -
      this.sipInvested;
  }

  calculateFD() {

    this.fdMaturity =
      this.fdAmount *
      Math.pow(
        1 + this.fdRate / 100,
        this.fdYears
      );

    this.fdInterest =
      this.fdMaturity -
      this.fdAmount;
  }

  calculateTax() {

    if (this.annualIncome <= 700000) {
      this.taxAmount = 0;
    }

    else if (
      this.annualIncome <= 1200000
    ) {
      this.taxAmount =
        this.annualIncome * 0.1;
    }

    else {
      this.taxAmount =
        this.annualIncome * 0.2;
    }

    this.netIncome =
      this.annualIncome -
      this.taxAmount;
  }
}
