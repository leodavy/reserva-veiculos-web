import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-popup',
  standalone: true,
  template: `
  @if (isVisible) {
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="bg-white p-8 rounded shadow-md max-w-md text-center">
        <p class="text-lg font-medium text-black">{{ message }}</p>
      </div>
    </div>
  }
  `,
})
export class CustomPopupComponent {
  @Input() message: string = '';
  isVisible: boolean = false;

  show(message: string): void {
    this.message = message;
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }
}