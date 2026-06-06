import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { DashboardService } from '../../core/services/dashboard';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any = null;
  dashboard: any = null;

  Math = Math;

  isDarkMode = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: 'index',
      intersect: false
    },

    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    },

    scales: {
      x: {
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(255,255,255,.05)'
        }
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: '#94a3b8'
        },

        grid: {
          color: 'rgba(255,255,255,.05)'
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadDashboard();

    const userData =
      localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  loadDashboard(): void {

    this.dashboardService
      .getDashboard()
      .subscribe({

        next: (res: any) => {

          this.dashboard = res;

          this.lineChartData = {
            labels: res.incomeExpenseChart.map(
              (item: any) => item.month
            ),

            datasets: [
              {
                label: 'Income',
                data: res.incomeExpenseChart.map(
                  (item: any) => item.income
                ),

                borderColor: '#00e676',
                backgroundColor: 'rgba(0,230,118,.15)',

                pointBackgroundColor: '#00e676',
                pointBorderColor: '#00e676',

                pointRadius: 5,
                pointHoverRadius: 7,

                borderWidth: 4,
                tension: 0.45,

                fill: true
              },

              {
                label: 'Expense',
                data: res.incomeExpenseChart.map(
                  (item: any) => item.expense
                ),

                borderColor: '#ff4b6e',
                backgroundColor: 'rgba(255,75,110,.15)',

                pointBackgroundColor: '#ff4b6e',
                pointBorderColor: '#ff4b6e',

                pointRadius: 5,
                pointHoverRadius: 7,

                borderWidth: 4,
                tension: 0.45,

                fill: true
              }
            ]
          };

          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error(err);
        }
      });
  }

  toggleTheme(): void {

    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {

      document.body.classList.remove(
        'light-theme'
      );

      document.body.classList.add(
        'dark-theme'
      );

    } else {

      document.body.classList.remove(
        'dark-theme'
      );

      document.body.classList.add(
        'light-theme'
      );
    }
  }


  get maxDailyAmount(): number {

    if (
      !this.dashboard?.dailySpending?.length
    ) {
      return 1;
    }

    return Math.max(
      ...this.dashboard.dailySpending.map(
        (item: any) =>
          Number(item.amount || 0)
      )
    );
  }


  get totalCategoryAmount(): number {

    if (
      !this.dashboard?.categoryBreakdown
    ) {
      return 0;
    }

    return this.dashboard.categoryBreakdown.reduce(
      (
        sum: number,
        item: any
      ) => sum + Number(item.value || 0),
      0
    );
  }
}