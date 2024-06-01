import { Component, OnInit } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../shared/service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../shared/model/usuario';
import { MenuItem } from '../shared/model/menu-item';
import { AdminService } from '../shared/service/admin.service';

@Component({
  selector: 'listagem-usuarios',
  standalone: true,
  imports: [
    CustomBackgroundComponent,
    CustomMenuComponent,
    CommonModule
  ],
  template: `
  <custom-background>
  <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 class="text-4xl font-bold mb-8 text-gray-800">Listagem de Usuários</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full max-w-screen-lg">
          <div *ngFor="let usuario of usuariosPaginated" class="bg-white shadow-lg rounded-3xl p-6">
            <h2 class="text-2xl font-bold mb-2">{{ usuario.usuTxNome }}</h2>
            <p class="text-gray-600"><strong>ID:</strong> {{ usuario.usuNrId }}</p>
            <p class="text-gray-600"><strong>Login:</strong> {{ usuario.usuTxLogin }}</p>
            <p class="text-gray-600"><strong>Role:</strong> {{ usuario.roles.join(', ') }}</p>
          </div>
        </div>

        <div class="flex justify-center items-center gap-4">
          <button class="px-4 py-2 text-preto rounded-lg " (click)="previousPage()" [disabled]="currentPage === 1">
            <
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button class="px-4 py-2 text-preto rounded-lg " (click)="nextPage()" [disabled]="currentPage === totalPages">
            >
          </button>
        </div>
      </div>
    </custom-background>
  
  `
})
export class ListagemUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosPaginated: Usuario[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  constructor(
    private usuarioService: UsuarioService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
      this.updatePaginatedUsuarios();
    });
  }

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Painel Administrador', route: '/admin', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  updatePaginatedUsuarios(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.usuariosPaginated = this.usuarios.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsuarios();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsuarios();
    }
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

}
