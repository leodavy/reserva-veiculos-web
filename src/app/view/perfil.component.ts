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
import { ActivatedRoute, Router } from '@angular/router';
import { CustomPopupComponent } from '../shared/components/custom-popup/custom-popup.component';

@Component({
  selector: 'perfil',
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
        <h1 class="text-4xl font-bold mb-4 text-gray-800">PERFIL {{ perfil?.perTxNome }}</h1>
        <p class="text-lg text-gray-600 mb-8">Aqui você pode gerenciar usuários associados a este perfil.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Associar usuário</h2>
            <p class="text-gray-600 mb-4">Associe um usuário a este perfil</p>
            <form [formGroup]="formGroup" (ngSubmit)="associarUsuarioPerfil()">
            <input type="text" formControlName="usuNrId" placeholder="Id do usuário" class="px-4 py-2 border rounded-lg mb-4 w-full" required>
              <button type="submit" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                <i class="fas fa-user-plus mr-2"></i>Associar Usuário
              </button>
              <div *ngIf="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
            </form>
          </div>

          <div class="bg-white shadow-lg rounded-lg p-6">
  <h2 class="text-2xl font-bold mb-4">Listagem de Usuários</h2>
  <p class="text-gray-600 mb-4">Visualize e gerencie todos os perfis do sistema.</p>
  <div class="grid grid-cols-1 gap-4">
  </div>
  <div class="flex justify-center items-center gap-4 mt-4">
    <button class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-700" (click)="previousPage()" [disabled]="currentPage === 1">
      Anterior
    </button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-700" (click)="nextPage()" [disabled]="currentPage === totalPages">
      Próxima
    </button>
  </div>
</div>

        </div>
        <custom-popup></custom-popup> 
      </div>
    </custom-background>
  `,
})
export class PerfilComponent implements OnInit {
  @ViewChild(CustomPopupComponent) popup!: CustomPopupComponent;
  usuario: JwtPayload | null = null;
  perfis: Perfil[] = [];
  perfisPaginated: Perfil[] = [];
  novoPerfilNome: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
  errorMessage: string = '';
  perfil: Perfil | null = null;

  constructor(
    private adminService: AdminService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const perNrId = params['perNrId'];
      if (perNrId) {
        this.carregarPerfil(perNrId);
      } else {
        console.error('Erro: ID do perfil não fornecido');
      }
    });
  }

  carregarPerfil(perfilId: number): void {
    this.adminService.getPerfilById(perfilId).subscribe(
      perfil => {
        this.perfil = perfil;
      },
      error => {
        console.error('Erro ao carregar perfil:', error);
      }
    );
  }
  associarUsuarioPerfil(): void {
    if (this.formGroup.valid && this.perfil) {
      const usuNrId: number = parseInt(this.formGroup.value.usuNrId);
      const perNrId: number = this.perfil.perNrId;

      this.adminService.associarPerfilUsuario(usuNrId, perNrId).pipe(
        tap(response => {
          console.log('Usuário associado ao perfil com sucesso', response);
          if (this.popup) {
            this.popup.show('Usuário associado ao perfil com sucesso!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            console.error('Erro: Popup não disponível');
          }
        }),
        catchError((error) => {
          console.error('Erro ao associar o usuário a este perfil:', error);
          this.errorMessage = 'Erro ao associar o usuário a este perfil.';
          return of(null);
        })
      ).subscribe();
    }
  }


  formGroup: FormGroup = new FormGroup({
    usuNrId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home', type: 'text' },
    { label: 'Painel Administrador', route: '/admin', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];
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

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
