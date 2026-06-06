import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  scrollToSection(sectionId: string): void {
   const element = document.getElementById(sectionId);

   if(element){
    element.scrollIntoView({
      behavior: 'smooth',
    });
   }
  }

}
