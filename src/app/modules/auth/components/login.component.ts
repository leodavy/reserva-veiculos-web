import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterOutlet,
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
      <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
      <a (click)="navegarRegistro()" class="block mt-4 text-sm text-indigo-600 hover:text-indigo-800">Registrar-se</a>
    </form>
  </div>
</div>
  `
})
export class LoginComponent {
  constructor(private router: Router) {}

  navegarRegistro(){
    this.router.navigate(["/registro"]);
  }
}
