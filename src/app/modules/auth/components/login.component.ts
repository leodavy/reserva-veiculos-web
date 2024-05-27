import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { CustomTextButtonComponent } from '../../../shared/components/custom-text-button/custom-text-button.component';
@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterOutlet,
    CustomButtonComponent,
    CustomTextButtonComponent
  ],
  template: `
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
    <form>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
        <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
      </div>
      <custom-button [buttonText]="'Login'"></custom-button>
    </form>
    <div class="mt-6 flex justify-center">
    <custom-text-button [buttonText]="'Registrar-se'" (buttonClick)="navegarRegistro()"></custom-text-button>

  </div>

  </div>
</div>
  `
})
export class LoginComponent {
  constructor(private router: Router) { }

  navegarRegistro() {
    this.router.navigate(["/registro"]);
  }
}
