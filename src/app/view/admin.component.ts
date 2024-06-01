import { Component, OnInit } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { UsuarioService } from '../shared/service/usuario.service';
import { Router } from '@angular/router';
import { MenuItem } from '../shared/model/menu-item';
import { JwtPayload } from '../shared/interceptors/JwtPayload';
import { AdminService } from '../shared/service/admin.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'admin',
  standalone: true,
  template: `
    <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-8">
        <h1 class="text-4xl font-bold mb-4 text-gray-800">Painel do Administrador</h1>
        <p class="text-lg text-gray-600 mb-8">Aqui você pode gerenciar usuários e perfis do sistema.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Listagem de Usuários</h2>
            <p class="text-gray-600 mb-4">Visualize e gerencie todos os usuários do sistema.</p>
            <button class="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-500" (click)="navigateTo('/admin/listagem-usuarios')">
            <fa-icon [icon]="['far', 'users']" class="text-red-700"></fa-icon> Ir para Listagem de Usuários
            </button>
          </div>

          <div class="bg-branco shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Gerenciar Perfis</h2>
            <p class="text-gray-600 mb-4">Visualize e gerencie todos os perfis do sistema.</p>
            <button class="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-blue-700" (click)="navigateTo('/admin/gerenciar-perfis')">
              <i class="fas users mr-2"></i>Ir para Gerenciar Perfis
            </button>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4">
          <div class="bg-branco shadow-lg rounded-lg p-4 w-40">
            <p class="text-3xl font-bold text-green-500">{{ totalUsuarios }}</p>
            <p class="text-gray-600">Usuários</p>
          </div>
          <div class="bg-branco shadow-lg rounded-lg p-4 w-40">
            <p class="text-3xl font-bold text-blue-500">{{ totalPerfis }}</p>
            <p class="text-gray-600">Perfis</p>
          </div>
        </div>
      </div>
    </custom-background>
  `,
  imports: [
    CustomBackgroundComponent,
    CustomMenuComponent,
    FontAwesomeModule
    ]
})
export class AdminComponent implements OnInit {
  usuario: JwtPayload | null = null;
  totalUsuarios: number = 0;
  totalPerfis: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarTotais();
  }

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  carregarTotais() {
    this.adminService.getTotalUsuarios().subscribe(total => this.totalUsuarios = total);
    this.adminService.getTotalPerfis().subscribe(total => this.totalPerfis = total);
  }
}
