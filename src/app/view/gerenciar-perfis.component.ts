import { Component, ViewChild } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { CustomPopupComponent } from '../shared/components/custom-popup/custom-popup.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from '../shared/model/menu-item';
import { tap } from 'rxjs';
import { AdminService } from '../shared/service/admin.service';
import { CustomButtonComponent } from "../shared/components/custom-button/custom-button.component";
import { CommonModule, Location } from '@angular/common';
import { JwtPayload } from 'jwt-decode';
import { Perfil } from '../shared/model/perfil';
import { UsuarioService } from '../shared/service/usuario.service';

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
    CustomPopupComponent],

  template: `<custom-background>
   <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-8">
        <h1 class="text-4xl font-bold mb-4 text-gray-800">Painel do Administrador</h1>
        <p class="text-lg text-gray-600 mb-8">Aqui você pode gerenciar usuários e perfis do sistema.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Cadastro de Perfil</h2>
            <p class="text-gray-600 mb-4">Defina e gerencie os perfis de usuários.</p>
            <form (ngSubmit)="registrar()">
              <input type="text" [(ngModel)]="novoPerfilNome" name="perfilNome" placeholder="Nome do Perfil" class="px-4 py-2 border rounded-lg mb-4 w-full" required>
              <button type="submit" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                <i class="fas fa-user-plus mr-2"></i>Cadastrar Perfil
              </button>
            </form>
          </div>

          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Listagem de Perfis</h2>
            <p class="text-gray-600 mb-4">Visualize e gerencie todos os perfis do sistema.</p>
            <ul>
              <li *ngFor="let perfil of perfis" class="border-b py-2">
                {{ perfil.perTxNome }}
              </li>
            </ul>
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
        </div>
      </div>
    </custom-background>
  `,
})
export class GerenciarPerfisComponent {
  usuario: JwtPayload | null = null;
  perfis: Perfil[] = [];
  novoPerfilNome: string = '';
  
  @ViewChild(CustomPopupComponent) popup!: CustomPopupComponent;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private adminService: AdminService,
    private location: Location
  ) { }

  ngOnInit(): void {
  
    this.carregarPerfis();
  }

  formGroup: FormGroup = new FormGroup({
    perTxNome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/inicio', type: 'text' },
    { label: 'Login', route: '/login', type: 'text' },
  ];

  registrar(): void {
    if (this.formGroup.valid) {
      const perTxNome: string = this.formGroup.value.perTxNome;
      this.adminService.criarPerfil(perTxNome).pipe(
        tap(() => {
          console.log('Perfil cadastrado com sucesso', perTxNome);
          setTimeout(() => {
            this.popup.show('Perfil cadastrado com sucesso!');
            setTimeout(() => {
              this.location.back();
            }, 1000);
          }, 100);
        })
      ).subscribe();
    } 
  }
  carregarPerfis() {
    this.adminService.getPerfis().subscribe(perfis => {
      this.perfis = perfis;
    });
  }

}
