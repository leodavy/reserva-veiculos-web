import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [],
template: `
<button class="flex items-center justify-center px-2 py-2 rounded-full">{{text}}</button>
 `
})
export class CustomButtonComponent {
  @Input() text: string = '';
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
}

