import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from '../../model/menu-item';
import { CommonModule } from '@angular/common';
import { CustomTextButtonComponent } from '../custom-text-button/custom-text-button.component';

@Component({
  selector: 'custom-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    CustomTextButtonComponent
  ],
  template: `
  <nav class="bg-primary p-1 fixed top-0 left-0 w-full z-50">
    <div class="flex items-center justify-end h-16 px-2">
      <div class="flex space-x-4">
        <ng-container *ngFor="let item of menuItems">
          <custom-text-button [buttonText]="item.label" (buttonClick)="navigate(item)"></custom-text-button>
        </ng-container>
      </div>
    </div>
  </nav>
  `
})
export class CustomMenuComponent {
  @Input() menuItems: MenuItem[] = [];

  constructor(private router: Router) {}

  navigate(item: MenuItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    } else if (item.action) {
      item.action();
    }
  }
}
