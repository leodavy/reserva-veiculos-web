import { Component, ViewChild, OnInit } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from '../shared/model/menu-item';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminService } from '../shared/service/admin.service';
import { CustomButtonComponent } from "../shared/components/custom-button/custom-button.component";
import { CommonModule, Location } from '@angular/common';
import { JwtPayload } from 'jwt-decode';
import { Perfil } from '../shared/model/perfil';
import { UsuarioService } from '../shared/service/usuario.service';
import { Router } from '@angular/router';
import { CustomPopupComponent } from '../shared/components/custom-popup/custom-popup.component';

@Component({
  selector: 'gerenciar-perfis',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CustomBackgroundComponent,
    CustomMenuComponent,
    CustomButtonComponent,
    CommonModule,
    CustomPopupComponent
  ],
  template: `       
    <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-8">
        <h1 class="text-4xl font-bold mb-4 text-gray-800">Painel do Administrador</h1>
        <p class="text-lg text-gray-600 mb-8">Aqui você pode gerenciar usuários e perfis do sistema.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white shadow-lg rounded-xl p-6">
            <h2 class="text-2xl font-bold mb-4">Cadastro de Perfil</h2>
            <p class="text-gray-600 mb-4">Defina e gerencie os perfis de usuários.</p>
            <form [formGroup]="formGroup" (ngSubmit)="registrar()">
              <input type="text" formControlName="perTxNome" placeholder="Nome do Perfil" class="px-4 py-2 border rounded-lg mb-4 w-full" required>
              <button type="submit" class="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-blue-700">
                <i class="fas fa-user-plus mr-2"></i>Cadastrar Perfil
              </button>
              <div *ngIf="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
            </form>
          </div>

          <div class="bg-white shadow-lg rounded-xl p-6">
  <h2 class="text-2xl font-bold mb-4">Listagem de Perfis</h2>
  <p class="text-gray-600 mb-4">Visualize e gerencie todos os perfis do sistema.</p>
  <div class="grid grid-cols-1 gap-4">
    <div *ngFor="let perfil of perfisPaginated" class="border-b py-2 cursor-pointer" (click)="navegarPerfil(perfil.perNrId)">
      {{ perfil.perTxNome }}
    </div>
  </div>
  <div class="flex justify-center items-center gap-4 mt-4">
    <button class="px-4 py-2  text-preto rounded-lg" (click)="previousPage()" [disabled]="currentPage === 1">
      <
    </button>
    <span>< {{ currentPage }} de {{ totalPages }}</span>
    <button class="px-4 py-2  text-preto rounded-lg " (click)="nextPage()" [disabled]="currentPage === totalPages">
      >
    </button>
  </div>
</div>

        </div>
        <custom-popup></custom-popup> 
      </div>
    </custom-background>
  `,
})
export class GerenciarPerfisComponent implements OnInit {
  @ViewChild(CustomPopupComponent) popup!: CustomPopupComponent;
  usuario: JwtPayload | null = null;
  perfis: Perfil[] = [];
  perfisPaginated: Perfil[] = [];
  novoPerfilNome: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregarPerfis();
  }

  formGroup: FormGroup = new FormGroup({
    perTxNome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Painel Administrador', route: '/admin', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  registrar(): void {
    if (this.formGroup.valid) {
      const perTxNome: string = this.formGroup.value.perTxNome;
      this.adminService.criarPerfil(perTxNome).pipe(
        tap(() => {
          console.log('Perfil cadastrado com sucesso', perTxNome);
          if (this.popup) {
            this.popup.show('Perfil cadastrado com sucesso!');
            this.carregarPerfis();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            console.error('Erro popup');
          }
        }),
        catchError((error) => {
          console.error('Erro ao cadastrar perfil:', error);
          this.errorMessage = 'Erro: O nome do perfil já existe.';
          return of(null);
        })
      ).subscribe();
    }
  }
  carregarPerfis() {
    this.adminService.getPerfis().subscribe(perfis => {
      this.perfis = perfis;
      this.totalPages = Math.ceil(this.perfis.length / this.itemsPerPage);
      this.updatePaginatedPerfis();
    });
  }
  updatePaginatedPerfis(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.perfisPaginated = this.perfis.slice(startIndex, startIndex + this.itemsPerPage);
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPerfis();
    }
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPerfis();
    }
  }

  navegarPerfil(perfilId: number): void {
    this.router.navigate([`admin/perfil/${perfilId}`]);
  }
  

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
