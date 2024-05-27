import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [],
  template:`
      <button (click)="onClick()" class="border-none w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">{{ buttonText }}</button>
  `
})
export class CustomButtonComponent {
  @Input() buttonText: string = '';
  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
