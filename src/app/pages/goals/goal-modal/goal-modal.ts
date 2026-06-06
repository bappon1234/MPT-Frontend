import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Goal } from '../../../core/services/goal';

@Component({
  selector: 'app-goal-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './goal-modal.html',
  styleUrl: './goal-modal.scss',
})
export class GoalModal {

  @Output() close = new EventEmitter();
  @Output() goalCreated = new EventEmitter();
  @Input() mode: 'create' | 'edit' | 'addFund' | 'withdrawlFund' = 'create';

  @Input() goal: any;

  amount = 0;

  loading = false;

  goalData = {
    name: '',
    target: '',
    deadline: '',
  };
  constructor(private goalService: Goal){}

  ngOnInit(){
    if(this.goal){
      this.goalData = {
        name: this.goal.name || '',
        target: this.goal.target || '',
        deadline: this.goal.deadline ? this.goal.deadline.split('T')[0] : ''
      };
    }
  }

  closeModal(){
    this.close.emit();
  }

submit() {
  this.loading = true;

  // CREATE

  if(this.mode === 'create'){

    this.goalService
      .createGoal(this.goalData)
      .subscribe({

        next:(res:any)=>{

          alert(res.message);

          this.goalCreated.emit();

          this.closeModal();

          this.loading = false;

        },

        error:(err)=>{

          this.loading = false;

          alert(err.error.message);

        }

      });

  }

  // EDIT

  else if(this.mode === 'edit'){

    this.goalService
      .updateGoal(
        this.goal.id,
        this.goalData
      )
      .subscribe({

        next:(res:any)=>{

          alert(res.message);

          this.goalCreated.emit();

          this.closeModal();

          this.loading = false;

        }

      });

  }

  // ADD FUND

  else if(this.mode === 'addFund'){

    const data = {

      saved:
      Number(this.goal.saved)
      +
      Number(this.amount)

    };

    this.goalService
      .updateGoal(
        this.goal.id,
        data
      )
      .subscribe({

        next:(res:any)=>{

          alert(res.message);

          this.goalCreated.emit();

          this.closeModal();

          this.loading = false;

        }

      });

  }

  // WITHDRAW

  else if(this.mode === 'withdrawlFund'){

    const updatedAmount =
      Number(this.goal.saved)
      -
      Number(this.amount);

    if(updatedAmount < 0){

      alert('Insufficient Fund');

      this.loading = false;

      return;

    }

    this.goalService
      .updateGoal(
        this.goal.id,
        {
          saved: updatedAmount
        }
      )
      .subscribe({

        next:(res:any)=>{

          alert(res.message);

          this.goalCreated.emit();

          this.closeModal();

          this.loading = false;

        }

      });

  }

}
}
