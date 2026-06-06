import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Expenses } from './pages/expenses/expenses';
import { Dashboard } from './pages/dashboard/dashboard';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Demo } from './pages/demo/demo';
import { Investments } from './pages/investments/investments';
import { Bills } from './pages/bills/bills';
import { Goals } from './pages/goals/goals';
import { Accounts } from './pages/accounts/accounts';
import { Budgets } from './pages/budgets/budgets';
import { IncomeComponent } from './pages/income/income';
import { Analytics } from './pages/analytics/analytics';
import { Settings } from './pages/settings/settings';
import { Forget } from './pages/forget/forget';
import { VerifyOtp } from './pages/verify-otp/verify-otp';
import { ResetPassword } from './pages/reset-password/reset-password';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { Checkout } from './pages/checkout/checkout';
import { PaymentProcessing } from './pages/payment-processing/payment-processing';
import { PaymentSuccess } from './pages/payment-success/payment-success';
import { DailyTools } from './pages/daily-tools/daily-tools';
import { FinanceTools } from './pages/finance-tools/finance-tools';

export const routes: Routes = [
    {
    path: '',
    component: Landing,
  },

  {
    path: 'demo',
    component: Demo,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'register',
    component: Register,
  },

  {
    path: 'dashboard',
    component: Dashboard,
  },

  {
    path: 'expenses',
    component: Expenses,
  },
  {
    path: 'income',
    component: IncomeComponent,
  },

  {
    path: 'budgets',
    component: Budgets,
  },

  {
    path: 'accounts',
    component: Accounts,
  },

  {
    path: 'goals',
    component: Goals,
  },

  {
    path: 'bills',
    component: Bills,
  },

  {
    path: 'investments',
    component: Investments,
  },
   {
    path: 'analytics',
    component: Analytics,
  },

  {
    path: 'settings',
    component: Settings,
  },

  {
    path: 'forget',
    component: Forget,
  },

  {
    path: 'verify-otp',
    component: VerifyOtp,
  },

  {
    path: 'reset-password',
    component: ResetPassword,
  },

  {path: 'admin-dashboard',
    component: AdminDashboard
  },

  {path: 'checkout',
    component: Checkout
  },

  {
    path: 'payment-processing',
    component: PaymentProcessing
  },

  {
    path: 'payment-success',
    component: PaymentSuccess
  },

  {
    path: 'daily-tools',
    component: DailyTools
  },

  {
    path: 'finance-tools',
    component: FinanceTools
  }
];
