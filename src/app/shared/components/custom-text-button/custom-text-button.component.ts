import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-text-button',
  standalone: true,
  imports: [],
  template: `
 <button (click)="onClick()" class="text-indigo-600 hover:text-indigo-800 focus:outline-none ">
      {{ buttonText }}
    </button>     `

})
export class CustomTextButtonComponent {
  @Input() buttonText: string = '';
  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
