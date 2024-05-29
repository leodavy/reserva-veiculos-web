import { Component } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { UsuarioService } from '../shared/service/usuario.service';
import { Router } from '@angular/router';
import { MenuItem } from '../shared/model/menu-item';
import { JwtPayload } from '../shared/interceptors/JwtPayload';

@Component({
    selector: 'admin',
    standalone: true,
    template: `
        <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-8">
        <h1 class="text-4xl font-bold mb-4 text-gray-800">Painel do Administrador</h1>
        <p class="text-lg text-gray-600 mb-8">Bem-vindo, {{ usuario?.payload?.usuTxNome }}! Aqui você pode gerenciar usuários e perfis do sistema.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Cadastro de Perfil</h2>
            <p class="text-gray-600 mb-4">Defina e gerencie os perfis de usuários com nomes únicos.</p>
            <button class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700" (click)="navigateTo('/admin/cadastro-perfil')">
              <i class="fas fa-user-plus mr-2"></i>Ir para Cadastro de Perfil
            </button>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Listagem de Usuários</h2>
            <p class="text-gray-600 mb-4">Visualize e gerencie todos os usuários do sistema.</p>
            <button class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700" (click)="navigateTo('/admin/listagem-usuarios')">
              <i class="fas fa-users mr-2"></i>Ir para Listagem de Usuários
            </button>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Associação Usuário-Perfil</h2>
            <p class="text-gray-600 mb-4">Associe usuários a um ou mais perfis de maneira eficiente.</p>
            <button class="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-700" (click)="navigateTo('/admin/associacao-usuario-perfil')">
              <i class="fas fa-link mr-2"></i>Ir para Associação
            </button>
          </div>
        </div>
        
        <div class="flex flex-wrap justify-center gap-4">
          <div class="bg-white shadow-lg rounded-lg p-4 w-40">
            <p class="text-3xl font-bold text-blue-500">120</p>
            <p class="text-gray-600">Usuários</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-4 w-40">
            <p class="text-3xl font-bold text-green-500">8</p>
            <p class="text-gray-600">Perfis</p>
          </div>
          <div class="bg-white shadow-lg rounded-lg p-4 w-40">
            <p class="text-3xl font-bold text-purple-500">15</p>
            <p class="text-gray-600">Associações</p>
          </div>
        </div>
      </div>
    </custom-background>
  
  `,
    imports: [CustomBackgroundComponent, CustomMenuComponent]
})
export class AdminComponent {
  usuario: JwtPayload | null = null;
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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
