import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    
  ],
  template: `
  <router-outlet ></router-outlet>
    `,
})
export class AppComponent {
  title = 'reserva-veiculos-web';
  constructor(private icons: FaIconLibrary,) {
    icons.addIconPacks(far, fas);
  }
}
