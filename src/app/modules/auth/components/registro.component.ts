import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../../../shared/model/usuario';
import { tap } from 'rxjs';

@Component({
  selector: 'registro',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
  <div class="absolute w-screen h-screen z-0">
      <div class="absolute"></div>
      <div class="absolute"></div>
    </div>
    <div class="relative z-40 w-screen h-screen flex items-start mt-40 justify-center">
      <div class="bg-white shadow-lg w-full mx-96 md rounded-xl border border-gray-400 overflow-hidden p-5">
        <h1 class="text-2xl font-bold pb-5">Cadastrar</h1>
        <form class="flex w-full gap-5 flex-col" [formGroup]="formGroup" (ngSubmit)="registrar()">
          <div class="border border-gray rounded-lg overflow-hidden">
            <input
              class="w-full rounded-lg px-2"
              type="text"
              formControlName="usuTxNome"
              placeholder="Nome"
            />
          </div>
          <div class="border border-gray rounded-lg overflow-hidden">
            <input
              class="w-full rounded-lg px-2"
              type="text"
              formControlName="usuTxLogin"
              placeholder="Login"
            />
          </div>
          <div class="border border-gray rounded-lg overflow-hidden">
            <input
              class="w-full rounded-lg px-2"
              type="password"
              formControlName="usuTxSenha"
              placeholder="Senha"
            />
          </div>
          <div class="flex w-full justify-end">
            <div class="rounded-lg bg-blue-950 w-fit px-2 py1 text-sm text-medium text-white">
              <button type="submit">Cadastrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegistroComponent {
  #router = inject(Router);
  
  formGroup: FormGroup = new FormGroup({
    usuTxNome: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    usuTxLogin: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    usuTxSenha: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  #authService = inject(AuthService);

  registrar(): void {
    if (this.formGroup.valid) {
      const user: Usuario = this.formGroup.value as Usuario;
      this.#authService.registrar(user).pipe(
        tap(() => {
          console.log('Cadastrado com sucesso', user);
          this.#router.navigate(['/login']); 
        })
      ).subscribe();
    }
  }
}
