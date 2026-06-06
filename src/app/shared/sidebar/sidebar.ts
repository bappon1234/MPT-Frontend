import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {

  user: any;

  isSidebarOpen = false;

  constructor(private router: Router){}

  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if(userData){
      this.user = JSON.parse(userData);
    }
    else{
      this.user = {
        name: 'Demo User',
        role: 'DEMO'
      };
    }

  }

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(){

    if(window.innerWidth < 768){
      this.isSidebarOpen = false;
    }

  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.isSidebarOpen = false;

    this.router.navigate(['/login']);
  }

  @HostListener('window:resize')

  onResize(){

    if(window.innerWidth > 768){
      this.isSidebarOpen = false;
    }

  }


}