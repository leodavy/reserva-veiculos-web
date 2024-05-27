import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-background',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
      <div class="bg-black min-h-screen flex items-center justify-center" [ngClass]="bgColorClass">
        <ng-content></ng-content>
      </div>
  `
})
export class CustomBackgroundComponent {
  @Input() bgColorClass: string = 'bg-black';
}
