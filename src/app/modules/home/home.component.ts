import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../shared/service/usuario.service';
import { VeiculoService } from '../../shared/service/veiculo.service';
import { CustomBackgroundComponent } from '../../shared/components/custom-background/custom-background.component';
import { CommonModule } from '@angular/common';
import { CustomMenuComponent } from "../../shared/components/custom-menu/custom-menu.component";
import { MenuItem } from '../../shared/model/menu-item';

@Component({
  selector: 'home',
  standalone: true,
  template: `
 <custom-background>
  <custom-menu [menuItems]="menuItems"></custom-menu>
  <div class="mt-12 p-12 flex justify-center"> 
    <h1 class="text-black text-2xl">Olá, seja bem-vindo {{ usuTxNome }}!</h1>
  </div>
</custom-background>

  `,
  imports: [
    CustomBackgroundComponent,
    CommonModule,
    CustomMenuComponent
  ]
})
export class HomeComponent {
  usuTxNome: string = '';
  veiculos: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private veiculoService: VeiculoService
  ) { }
  menuItems: MenuItem[] = [
    { label: 'Home', route: '/home', type: 'text' },
    { label: 'Sair', route: '/login', type: 'text' },
  ];
  

 

  loadVehicles() {
    this.veiculoService.listaVeiculos().subscribe(vehicles => {
      this.veiculos = vehicles;
    });
  }

  navigateToReservation(vehicleId: string) {
    this.router.navigate([`/home/reserve-vehicle`, vehicleId]);
  }
}
