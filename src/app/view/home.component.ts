import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomBackgroundComponent } from '../shared/components/custom-background/custom-background.component';
import { CommonModule } from '@angular/common';
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { MenuItem } from '../shared/model/menu-item';
import { UsuarioService } from '../shared/service/usuario.service';
import { JwtPayload } from '../shared/interceptors/JwtPayload';

@Component({
  selector: 'home',
  standalone: true,
  template: `
    <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="mt-12 p-12 flex justify-center" *ngIf="usuario?.payload">
        <h1 class="text-black text-2xl">Olá, seja bem-vindo {{ usuario?.payload?.usuTxNome }}!</h1>
      </div>
    </custom-background>
  `,
  imports: [
    CustomBackgroundComponent,
    CommonModule,
    CustomMenuComponent
  ]
})
export class HomeComponent implements OnInit {
  usuario: JwtPayload | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarioAtual().subscribe(usuario => {
      console.log('Usuário logado:', usuario);
      this.usuario = usuario;

         if (usuario && usuario.payload.roles.includes('ROLE_ADMIN')) {
        this.menuItems.splice(1, 0, { label: 'Painel Administrador', route: '/admin', type: 'text' });
      }
    });
  }

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
