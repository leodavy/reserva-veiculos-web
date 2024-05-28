import { Component } from '@angular/core';
import { CustomBackgroundComponent } from "../../../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../../../shared/components/custom-menu/custom-menu.component";
import { MenuItem } from '../../../shared/model/menu-item';

@Component({
    selector: 'home',
    standalone: true,
    imports: [
      CustomBackgroundComponent,
      CustomMenuComponent,
      CustomMenuComponent
    
    ],
    template: `
  <custom-background>
    <custom-menu [menuItems]="menuItems"></custom-menu>






  </custom-background>
  `,
    
})
export class HomeComponent {
  menuItems: MenuItem[] = [
    { label: 'Início', route: '/', type: 'text' },
    { label: 'Registre-se', route: '/registro', type: 'text' },
  ];

}
