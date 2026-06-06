import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Account } from '../../core/services/account';
import { AcoountModal } from './acoount-modal/acoount-modal';

@Component({
  selector: 'app-accounts',
  imports: [Sidebar, CommonModule, AcoountModal],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts {
  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user: any;
  accounts: any[] = [];
  showModal = false;
  selectedAccount:any = null;
  skeletonCards = Array(6).fill(0);

  isDarkMode = true;
  loading = false;

  constructor(private accountService: Account,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }

    this.getAccounts();
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

  openModal(account?: any) {
    if(account){
      this.selectedAccount = account;
    } else {
      this.selectedAccount = null;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedAccount = null;
  }

  refreshAccounts() {
    this.getAccounts();
    this.closeModal();
  }

  getAccounts() {

    this.loading = true;

    this.accountService.getAllAccount().subscribe({
      next: (res: any) => {

        this.accounts = res.accounts || [];

        setTimeout(() => {

        this.loading = false;

        this.cdr.detectChanges();
        }, 1500);
      },

      error: (err) => {

        console.log(err);

        this.loading = false;
      }
    });
  }


  deleteAccount(id: string) {

    if (!confirm('Delete account?')) return;

    this.accountService.deleteAccount(id).subscribe({
      next: () => {
        this.getAccounts();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
