import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { CustomTextButtonComponent } from '../../../shared/components/custom-text-button/custom-text-button.component';
import { CustomBackgroundComponent } from '../../../shared/components/custom-background/custom-background.component';
import { CustomMenuComponent } from '../../../shared/components/custom-menu/custom-menu.component';
import { MenuItem } from '../../../shared/model/menu-item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomPopupComponent } from "../../../shared/components/custom-popup/custom-popup.component";
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../shared/service/usuario.service';
import { tap } from 'rxjs';
@Component({
  selector: 'login',
  standalone: true,
  template: `
   <custom-background>
  <custom-menu [menuItems]="menuItems"></custom-menu>
  <div class="flex justify-center items-center h-screen">
  <div class="bg-black p-8 rounded shadow-md w-full max-w-md ">
    <h2 class="text-2xl text-white font-bold mb-6 text-center">Login</h2>
    <form [formGroup]="formGroup" (ngSubmit)="login()">
      <div class="mb-4">
        <label for="login" class="block text-sm font-medium text-white">Usuário</label>
        <input type="text" id="login" formControlName="login" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-white">Senha</label>
        <input type="password" id="password" formControlName="senha" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <custom-button [buttonText]="'Login'"></custom-button>
      <div *ngIf="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
    </form>
  </div>
  <custom-popup></custom-popup>
  </div>
  </custom-background>
  `,
  imports: [
    RouterOutlet,
    CustomButtonComponent,
    CustomTextButtonComponent,
    CustomBackgroundComponent,
    CustomMenuComponent,
    ReactiveFormsModule,
    CustomPopupComponent,
    CommonModule
  ]
})
export class LoginComponent {
  @ViewChild(CustomPopupComponent) popup!: CustomPopupComponent;
  formGroup: FormGroup;
  errorMessage = '';

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.formGroup = new FormGroup({
      login: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      senha: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/', type: 'text' },
    { label: 'Registre-se', route: '/registro', type: 'text' },
  ];

  navegarRegistro() {
    this.router.navigate(["/registro"]);
  }
  login(): void {
    if (this.formGroup.valid) {
      const credentials = this.formGroup.value;
      this.usuarioService.login(credentials).pipe(
        tap({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.errorMessage = 'Login ou senha inválidos';
            console.error(err);
          }
        })
      ).subscribe();
    }
  }
}
