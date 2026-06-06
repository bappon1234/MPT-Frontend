import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bill } from '../../../core/services/bill';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bill-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './bill-modal.html',
  styleUrl: './bill-modal.scss',
})
export class BillModal {
  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Input() bill: any;

  loading = false;

  formData = {
    name: '',
    amount: 0,
    dueDate: '',
    category: 'monthly',
    paid: false
  };

  constructor(
    private billService: Bill
  ) { }

  ngOnInit() {

    if (this.bill) {

      this.formData = {

        name: this.bill.name,
        amount: this.bill.amount,
        dueDate: this.bill.dueDate,
        category: this.bill.category,
        paid: this.bill.paid
      };
    }
  }

  saveBill() {

    this.loading = true;

    if (this.bill) {

      this.billService
        .updateBills(this.bill.id, this.formData)
        .subscribe({

          next: () => {

            this.loading = false;

            this.saved.emit();
          },

          error: () => {

            this.loading = false;
          }
        });

    } else {

      this.billService
        .createBills(this.formData)
        .subscribe({

          next: () => {

            this.loading = false;

            this.saved.emit();
          },

          error: () => {

            this.loading = false;
          }
        });
    }
  }
}
