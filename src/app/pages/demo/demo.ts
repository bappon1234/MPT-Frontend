import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './demo.html',
  styleUrls: ['./demo.scss']
})
export class Demo implements OnInit {

  @ViewChild(Sidebar)
  sidebar!: Sidebar;

  user = {
    name: 'Demo User',
    role: 'DEMO'
  };

  isDarkMode = true;

  ngOnInit(): void {

    const userData = localStorage.getItem('user');

    if(userData){

      this.user = JSON.parse(userData);

    }

    console.log(this.user);

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