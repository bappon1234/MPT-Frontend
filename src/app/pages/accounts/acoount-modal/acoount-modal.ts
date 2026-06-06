import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../../../core/services/account';

@Component({
  selector: 'app-acoount-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './acoount-modal.html',
  styleUrl: './acoount-modal.scss',
})
export class AcoountModal implements OnInit{
  @Output() close = new EventEmitter();
  @Output() accountCreated = new EventEmitter();
  @Input() account: any;

   loading = false;

  selectedColor = '#8b5cf6';

  colors = [
    '#8b5cf6',
    '#3b82f6',
    '#22c55e',
    '#f97316',
    '#ef4444',
    '#ec4899'
  ];

  formData = {
    name: '',
    type: '',
    balance: 0,
    color: '#8b5cf6'
  };

  constructor(
    private accountService: Account
  ) {}

   ngOnInit(): void {

    if (this.account) {

      this.formData = {
        name: this.account.name,
        type: this.account.type,
        balance: this.account.balance,
        color: this.account.color
      };

      this.selectedColor = this.account.color;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.formData.color = color;
  }

  // createAccount() {

  //   if (!this.formData.name || !this.formData.type) {
  //     return;
  //   }

  //   this.loading = true;

  //   this.accountService.createAccount(this.formData).subscribe({
  //     next: () => {

  //       this.loading = false;

  //       this.accountCreated.emit();

  //       this.close.emit();
  //     },

  //     error: (err) => {
  //       console.log(err);
  //       this.loading = false;
  //     }
  //   });
  // }

  createAccount() {

  if (!this.formData.name || !this.formData.type) {
    return;
  }

  this.loading = true;

  if (this.account) {

    this.accountService
      .updateAccount(this.account.id, this.formData)
      .subscribe({
        next: () => {

          this.loading = false;

          this.accountCreated.emit();

          this.close.emit();
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      });

  } else {

    this.accountService
      .createAccount(this.formData)
      .subscribe({
        next: () => {

          this.loading = false;

          this.accountCreated.emit();

          this.close.emit();
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      });
  }
}
}
