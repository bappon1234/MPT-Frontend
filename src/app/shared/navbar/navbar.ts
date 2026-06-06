import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

    @Input() user: any;
  @Input() isDarkMode = false;

  toggleThemeEvent = new Event('toggle-theme');
}
