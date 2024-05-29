import { Component, ViewChild } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { CustomPopupComponent } from '../shared/components/custom-popup/custom-popup.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from '../shared/model/menu-item';
import { tap } from 'rxjs';
import { AdminService } from '../shared/service/admin.service';
import { CustomButtonComponent } from "../shared/components/custom-button/custom-button.component";
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'cadastro-perfil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomBackgroundComponent,
    CustomMenuComponent,
    CustomButtonComponent,
    CommonModule,
    CustomPopupComponent],

  template: `<custom-background>
  <custom-menu [menuItems]="menuItems"></custom-menu>
  <div class="flex justify-center items-center h-screen bg-cover bg-center" style="background-image: url('assets/background.jpg');">
    <div class="bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-3xl font-bold mb-6 text-center text-white">Cadastro de Perfil</h2>
      <form [formGroup]="formGroup" (ngSubmit)="registrar()">
        <div class="mb-4">
          <label for="nomePerfil" class="block text-sm font-medium text-white">Nome do Perfil</label>
          <input 
            type="text" 
            id="nomePerfil" 
            formControlName="perTxNome" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
            required>
        </div>
        <custom-button [buttonText]="'Cadastrar'"></custom-button>
      </form>
    </div>
    <custom-popup></custom-popup>
  </div>
</custom-background>
  `,
})
export class CadastroPerfilComponent {
  @ViewChild(CustomPopupComponent) popup!: CustomPopupComponent;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private location: Location
  ) { }

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

}
