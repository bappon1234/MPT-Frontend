import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Income } from '../../../core/services/income';

@Component({
  selector: 'app-income-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './income-modal.html',
  styleUrl: './income-modal.scss',
})
export class IncomeModal {

  @Input() editMode = false;
  @Input() editData: any;

  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();

  loading = false;

  form = {
    title: '',
    source: '',
    amount: 0,
    note: '',
    date: '',
  };

  ngOnChanges() {
    if (this.editMode && this.editData) {
      this.form = {
        title: this.editData.title || '',
        source: this.editData.source || '',
        amount: this.editData.amount || 0,
        note: this.editData.note || '',
        date: this.editData.date ? this.editData.date.split('T')[0] : ''
      };
    }
  }

  constructor(private incomeService: Income) { }


  submit() {
    this.loading = true;

    if (this.editMode) {
      this.incomeService.updateIncome(this.editData.id, this.form)
        .subscribe({
          next: () => {
            this.loading = false;
            this.saved.emit();
          },
          error: () => this.loading = false
        });
    } else {
      this.incomeService.createIncome(this.form)
        .subscribe({
          next: () => {
            this.loading = false;
            this.saved.emit();
          },
          error: () => this.loading = false
        });
    }
  }

}