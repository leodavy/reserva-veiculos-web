import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule
  ],
  template: `
  <router-outlet ></router-outlet>
    `,
})
export class AppComponent {
  title = 'reserva-veiculos-web';
}
