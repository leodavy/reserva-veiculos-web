import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../shared/service/usuario.service';
import { Usuario } from '../shared/model/usuario';
import { tap } from 'rxjs';

import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { CustomPopupComponent } from '../shared/components/custom-popup/custom-popup.component';
import { CustomBackgroundComponent } from '../shared/components/custom-background/custom-background.component';
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { MenuItem } from '../shared/model/menu-item';

@Component({
  selector: 'registro',
  standalone: true,
  template: `
  <custom-background>
  <custom-menu [menuItems]="menuItems"></custom-menu>
  <div class="flex justify-center items-center h-screen">
  <div class="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Registro</h2>
    <form [formGroup]="formGroup" (ngSubmit)="registrar()">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-white">Nome</label>
        <input type="text" id="name" formControlName="usuTxNome" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-6">
        <label for="login" class="block text-sm font-medium text-white">Login</label>
        <input type="text" id="login" formControlName="usuTxLogin" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-white -">Senha</label>
        <input type="password" id="password" formControlName="usuTxSenha" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <custom-button [buttonText]="'Cadastrar'"></custom-button>      
    </form>
  </div>
  <custom-popup></custom-popup>
</div>
  </custom-background>
  `,
  imports: [
    ReactiveFormsModule,
    CustomPopupComponent,
    CustomButtonComponent,
    CustomBackgroundComponent,
    CustomMenuComponent
  ]
})
export class RegistroComponent {
  @ViewChild(CustomPopupComponent) popup!: CustomPopupComponent;
  constructor(private router: Router, private usuarioService: UsuarioService) { }
  formGroup: FormGroup = new FormGroup({
    usuTxNome: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    usuTxLogin: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    usuTxSenha: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/inicio', type: 'text' },
    { label: 'Login', route: '/login', type: 'text' },
  ];
  registrar(): void {
    if (this.formGroup.valid) {
      const user: Usuario = this.formGroup.value as Usuario;
      this.usuarioService.registrar(user).pipe(
        tap(() => {
          console.log('Usuário cadastrado com sucesso', user);
          setTimeout(() => {
            this.popup.show('Usuário cadastrado com sucesso!');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }, 100);
        })
      ).subscribe();
    }
  }
}


