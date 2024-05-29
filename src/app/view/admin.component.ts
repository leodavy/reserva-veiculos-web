import { Component } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { UsuarioService } from '../shared/service/usuario.service';
import { Router } from '@angular/router';
import { MenuItem } from '../shared/model/menu-item';

@Component({
    selector: 'admin',
    standalone: true,
    template: `
   <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      
    </custom-background>
  
  `,
    imports: [CustomBackgroundComponent, CustomMenuComponent]
})
export class AdminComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

}
