import { Component } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";

@Component({
    selector: 'admin',
    standalone: true,
    template: `
   <custom-background>
      <!-- <custom-menu [menuItems]="menuItems"></custom-menu> -->
      
    </custom-background>
  
  `,
    imports: [CustomBackgroundComponent, CustomMenuComponent]
})
export class AdminComponent {

}
