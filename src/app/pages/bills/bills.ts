import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Bill } from '../../core/services/bill';
import { BillModal } from './bill-modal/bill-modal';

@Component({
  selector: 'app-bills',
  imports: [Sidebar, CommonModule, BillModal],
  templateUrl: './bills.html',
  styleUrl: './bills.scss',
})
export class Bills {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any;
  bills: any[] = [];
  loading = false;
  showModal = false;
  selectedBill: any = null;

  isDarkMode = true;

  constructor(private billService: Bill,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }

    this.getBills();
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

  getBills() {
    this.loading = true;
    this.billService.getAllBills().subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.bills = res.bills || [];
          this.loading = false;
          this.cdr.detectChanges()
        }, 1500);
      }, error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  openModal(bill?: any) {
    this.selectedBill = bill || null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBill = null;
  }

  refreshBills() {

    this.getBills();

    this.closeModal();
  }

  deleteBill(id: string) {

    if (!confirm('Delete bill?')) return;

    this.billService.deleteBills(id).subscribe({
      next: () => {

        this.getBills();
      }
    });
  }

  togglePaidStatus(bill: any) {

    const payload = {
      paid: !bill.paid
    };

    this.billService
      .updateBills(bill.id, payload)
      .subscribe({

        next: () => {

          bill.paid = !bill.paid;

        },

        error: (err) => {

          console.log(err);

        }

      });
  }

  getDaysLeft(dueDate: string): number {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);

    due.setHours(0, 0, 0, 0);

    const diff =
      due.getTime() - today.getTime();

    return Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );
  }

  getBillStatus(bill: any): string {

    if (bill.paid) return 'Paid';

    const days =
      this.getDaysLeft(bill.dueDate);

    if (days < 0) return 'Overdue';

    if (days === 0) return 'Due Today';

    if (days <= 7)
      return `${days} Days Left`;

    return 'Upcoming';
  }
}
