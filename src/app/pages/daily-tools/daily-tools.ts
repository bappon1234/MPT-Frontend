import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/sidebar/sidebar';

type ToolType =
  | 'split'
  | 'tip'
  | 'discount'
  | 'currency'
  | 'fuel'
  | 'age';

@Component({
  selector: 'app-daily-tools',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './daily-tools.html',
  styleUrl: './daily-tools.scss',
})
export class DailyTools implements OnInit {

  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any;
  isDarkMode = true;

  activeTool: ToolType = 'split';

  // Split
  splitAmount = 1000;
  splitPeople = 2;
  splitTip = 0;
  splitResult = 500;

  // Tip
  billAmount = 1000;
  tipPercent = 10;
  tipResult = 100;
  totalBill = 1100;

  // Discount
  originalPrice = 1000;
  discountPercent = 20;
  savedAmount = 200;
  finalPrice = 800;

  // Currency
  currencyAmount = 100;
  currencyRate = 83.5;
  convertedAmount = 8350;

  // Fuel
  distance = 100;
  mileage = 20;
  fuelPrice = 105;
  tripCost = 525;

  // Age
  birthDate = '';
  ageText = '';

  ageYears = 0;
  ageMonths = 0;
  ageDays = 0;

  totalDaysLived = 0;

  ngOnInit(): void {

    this.calculateSplit();

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }
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

  setTool(tool: ToolType) {
    this.activeTool = tool;
  }

  calculateSplit() {

    if (!this.splitPeople) {
      return;
    }

    const tip =
      this.splitAmount *
      (this.splitTip / 100);

    const total =
      this.splitAmount + tip;

    this.splitResult =
      total / this.splitPeople;
  }

  calculateTip() {

    this.tipResult =
      this.billAmount *
      (this.tipPercent / 100);

    this.totalBill =
      this.billAmount +
      this.tipResult;
  }

  calculateDiscount() {

    this.savedAmount =
      this.originalPrice *
      (this.discountPercent / 100);

    this.finalPrice =
      this.originalPrice -
      this.savedAmount;
  }

  calculateCurrency() {

    this.convertedAmount =
      this.currencyAmount *
      this.currencyRate;
  }

  calculateFuel() {

    if (
      !this.distance ||
      !this.mileage ||
      !this.fuelPrice
    ) {
      return;
    }

    const fuelNeeded =
      this.distance / this.mileage;

    this.tripCost =
      fuelNeeded * this.fuelPrice;
  }

  calculateAge() {

    if (!this.birthDate) {
      this.ageText = '';
      this.totalDaysLived = 0;
      return;
    }

    const dob = new Date(this.birthDate);
    const today = new Date();

    let years =
      today.getFullYear() - dob.getFullYear();

    let months =
      today.getMonth() - dob.getMonth();

    let days =
      today.getDate() - dob.getDate();

    if (days < 0) {

      const previousMonth =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );

      days += previousMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    this.ageYears = years;
    this.ageMonths = months;
    this.ageDays = days;

    this.ageText =
      `${years}y ${months}m ${days}d`;

    const diffTime =
      today.getTime() - dob.getTime();

    this.totalDaysLived =
      Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );
  }
}