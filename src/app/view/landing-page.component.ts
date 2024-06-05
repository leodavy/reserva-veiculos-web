import { Component } from '@angular/core';
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { MenuItem } from '../shared/model/menu-item';

@Component({
    selector: 'inicio',
    standalone: true,
    template: `
  <custom-menu></custom-menu>
  <custom-menu [menuItems]="menuItems"></custom-menu>

  <section class="bg-secondary text-white py-20" id="about">
    <div class="container mx-auto text-center">
      <h2 class="text-4xl font-bold mb-4">Bem-vindo à Melhor Locadora de Veículos!</h2>
      <p class="text-lg mb-8">Encontre o carro perfeito para sua viagem.</p>
      <a href="/registro" class="bg-primary text-white px-6 py-3 rounded-full hover:bg-tertiary hover:text-primary">Registre-se</a>
    </div>
  </section>

  <section class="py-20" id="services">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8 text-primary">Nossos Serviços</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-4 text-secondary">Aluguel de Carros</h3>
          <p>Escolha entre uma variedade de veículos para alugar.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-4 text-secondary">Manutenção de Veículos</h3>
          <p>Serviço de manutenção para garantir a segurança do seu veículo.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-4 text-secondary">Assistência 24h</h3>
          <p>Suporte e assistência em qualquer hora e lugar.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-primary text-white py-20" id="contact">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Contato</h2>
      <p class="mb-8">Entre em contato conosco para mais informações.</p>
      <form class="max-w-lg mx-auto">
        <div class="mb-4">
          <input type="text" class="w-full p-2 rounded" placeholder="Nome" required>
        </div>
        <div class="mb-4">
          <input type="email" class="w-full p-2 rounded" placeholder="Email" required>
        </div>
        <div class="mb-4">
          <textarea class="w-full p-2 rounded" rows="4" placeholder="Mensagem" required></textarea>
        </div>
        <button type="submit" class="bg-secondary text-white px-6 py-3 rounded-full hover:bg-tertiary hover:text-primary">Enviar</button>
      </form>
    </div>
  </section>


  
  
  
  
  `,
    imports: [CustomMenuComponent]
})
export class LandingPageComponent {


  menuItems: MenuItem[] = [
    { label: 'Início', route: '/inicio', type: 'text' },
    { label: 'Registre-se', route: '/registro', type: 'text'},
    { label: 'Login', route: '/login', type: 'text'},
  ];

}
