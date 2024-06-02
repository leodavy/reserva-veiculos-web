import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomBackgroundComponent } from '../shared/components/custom-background/custom-background.component';
import { CommonModule } from '@angular/common';
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { MenuItem } from '../shared/model/menu-item';
import { UsuarioService } from '../shared/service/usuario.service';
import { JwtPayload } from '../shared/interceptors/JwtPayload';
import { Veiculo } from '../shared/model/veiculo';
import { VeiculoService } from '../shared/service/veiculo.service';

@Component({
  selector: 'home',
  standalone: true,
  template: `
<custom-background>
  <custom-menu [menuItems]="menuItems"></custom-menu>
  <div class="mt-12 p-12 flex justify-center items-center flex-col" *ngIf="usuario?.payload">
    <h1 class="text-preto text-4xl font-bold mb-6">Olá, seja bem-vindo {{ usuario?.payload?.usuTxNome }}!</h1>
    <button (click)="navigateToCadastro()" class="px-6 py-3 bg-secondary text-branco rounded-lg hover:bg-secondary mb-6">
      Cadastrar Novo Veículo
    </button>
  </div>
  <div class="flex justify-center items-center">
    <div class="bg-white border border-gray-300 p-8 rounded-lg shadow-lg w-[1200px]">
      <div class="flex flex-col items-center overflow-y-auto h-[calc(100vh-300px)]">
        <div class="w-full grid grid-cols-3 gap-6">
          <div *ngFor="let veiculo of veiculosPaginated" 
                class="veiculo-item border p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-all"
                (click)="navigateToDetails(veiculo.veiNrId)"
                >
            <div class="flex flex-col items-center">
              <img *ngIf="veiculo.imagemPrincipal" 
                   [src]="'data:image/' + veiculo.imagemPrincipal.imvTxExtensao + ';base64,' + veiculo.imagemPrincipal.imvBtBytes" 
                   alt="{{ veiculo.veiTxNome }}" 
                   class="w-full h-40 object-cover rounded-lg mb-4">
              <div class="text-center">
                <div class="text-xl font-bold text-gray-800">{{ veiculo.veiTxNome }}</div>
                <div class="text-gray-600 mt-2">Marca: {{ veiculo.veiTxMarca }}</div>
                <div class="text-gray-600">Tipo: {{ veiculo.veiTxTipo }}</div>
                <button (click)="reservarVeiculo(veiculo.veiNrId, $event)" class="mt-4 px-6 py-2 bg-secondary text-branco rounded-full hover:bg-blue-700 shadow-lg">
                  Fazer Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination flex justify-center items-center gap-4 mt-6">
          <button (click)="previousPage()" 
                  [disabled]="currentPage === 1" 
                  class="px-4 py-2 text-black rounded-lg hover:rounded-lg hover: disabled:"><</button>
          <span class="text-lg">Página {{ currentPage }} de {{ totalPages }}</span>
          <button (click)="nextPage()" 
                  [disabled]="currentPage === totalPages" 
                  class="px-4 py-2 text-black rounded-lg   disabled:">></button>
        </div>
      </div>
    </div>
  </div>
</custom-background>
  `,
  imports: [
    CustomBackgroundComponent,
    CommonModule,
    CustomMenuComponent
  ]
})
export class HomeComponent implements OnInit {

  usuario: JwtPayload | null = null;
  veiculos: Veiculo[] = [];
  veiculosPaginated: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(
    private usuarioService: UsuarioService,
    private veiculoService: VeiculoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAtual().subscribe(usuario => {
      console.log('Usuário logado:', usuario);
      this.usuario = usuario;

      if (usuario && usuario.payload.roles.includes('ROLE_ADMIN')) {
        this.menuItems.splice(1, 0, { label: 'Painel Administrador', route: '/admin', type: 'text' });
      }
      this.loadVeiculos();
    });
  }

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  loadVeiculos(): void {
    this.veiculoService.listaVeiculos().subscribe(veiculos => {
      this.veiculos = veiculos;
      this.totalPages = Math.ceil(this.veiculos.length / this.itemsPerPage);
      this.updatePaginatedVeiculos();
    });
  }

  updatePaginatedVeiculos(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.veiculosPaginated = this.veiculos.slice(startIndex, startIndex + this.itemsPerPage);
    this.veiculosPaginated.forEach(veiculo => {
      this.veiculoService.getImagensByVeiculoId(veiculo.veiNrId).subscribe(imagens => {
        if (imagens.length > 0) {
          veiculo.imagemPrincipal = imagens[0];
        }
      });
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedVeiculos();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedVeiculos();
    }
  }

  navigateToDetails(veiNrId: number): void {
    this.router.navigate([`home/detalhes-veiculo/${veiNrId}`]);
  }

  navigateToCadastro():void {
    this.router.navigate(['/home/cadastrar-veiculo']);
  }

  reservarVeiculo(veiculoId: number, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/reservar', veiculoId]);
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}

