import { Component, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  imports: [Sidebar, CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics {
  @ViewChild(Sidebar)
  sidebar! : Sidebar;

  user: any;

  isDarkMode = true;

  ngOnInit(): void{
    const userData = localStorage.getItem('user');

    if(userData){
      this.user = JSON.parse(userData);
    }
  }

    toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    if(this.isDarkMode){
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }else{
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
}
