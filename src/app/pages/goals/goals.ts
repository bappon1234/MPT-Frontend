import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Goal } from '../../core/services/goal';
import { GoalModal } from './goal-modal/goal-modal';

@Component({
  selector: 'app-goals',
  imports: [Sidebar, CommonModule, GoalModal],
  templateUrl: './goals.html',
  styleUrl: './goals.scss',
})
export class Goals {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any;

  goals: any[] = [];

  isDarkMode = true;

  showGoalModal = false;
  selectedGoal: any = null;

  loading = true;

  modalMode: 'create' | 'edit' | 'addFund' | 'withdrawlFund' = 'create';

  constructor(private goalService: Goal,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getGoals()
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

  getGoals() {

    this.loading = true;

    this.goalService.getGoals().subscribe({

      next: (res: any) => {

        this.goals = res.goals;

        setTimeout(() => {

          this.loading = false;

          this.cdr.detectChanges();

        }, 1000); 

      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

  }

  deleteGoal(id: string) {

    const confirmDelete =
      confirm(
        'Delete this goal?'
      );

    if (!confirmDelete)
      return;

    this.goalService
      .deleteGoal(id)
      .subscribe({

        next: (res: any) => {

          alert(res.message);

          this.getGoals();

        },

        error: (err) => {

          alert(
            err.error.message
          );

        }

      });

  }

  getRemainingDays(deadline: string): number {

  const today = new Date();

  const endDate = new Date(deadline);

  const diff =
    endDate.getTime() -
    today.getTime();

  return Math.max(
    Math.ceil(diff / (1000 * 60 * 60 * 24)),
    0
  );
}

  openGoalModal() {
    this.modalMode = 'create'
    this.selectedGoal = null;
    this.showGoalModal = true;
  }

  editGoal(goal: any){
    this.modalMode = 'edit';
    this.selectedGoal = goal;
    this.showGoalModal = true;
  }

  addFund(goal: any) {
    this.modalMode = 'addFund';
    this.selectedGoal = goal;
    this.showGoalModal = true;
  }

  withdrawFund(goal: any){
    this.modalMode = 'withdrawlFund';
    this.selectedGoal = goal;
    this.showGoalModal = true;
  }

  closeGoalModal() {
    this.showGoalModal = false;
    this.selectedGoal = null;
  }
}
