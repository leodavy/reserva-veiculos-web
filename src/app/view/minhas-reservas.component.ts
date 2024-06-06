import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../shared/service/usuario.service";
import { VeiculoService } from "../shared/service/veiculo.service";
import { JwtPayload } from "../shared/interceptors/JwtPayload";
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "../shared/model/menu-item";
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from "../shared/components/custom-menu/custom-menu.component";
import { ReservaVeiculo } from '../shared/model/reserva-veiculo';
import { Veiculo } from '../shared/model/veiculo';
import { ImagemVeiculo } from '../shared/model/imagem-veiculo';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'minhas-reservas',
  standalone: true,
  template: `
    <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="mt-12 p-12 flex justify-center items-center flex-col" *ngIf="usuario?.payload">
        <h1 class="text-preto text-4xl font-bold mb-6">Minhas Reservas</h1>
        <div class="w-full grid grid-cols-3 gap-6">
          <ng-container *ngFor="let reserva of reservas">
            <div class="reserva-item border p-4 rounded-lg shadow-md">
              <div class="flex flex-col items-center">
                <img *ngIf="reserva.imagemPrincipal" 
                     [src]="'data:image/' + reserva.imagemPrincipal.imvTxExtensao + ';base64,' + reserva.imagemPrincipal.imvBtBytes" 
                     alt="{{ reserva.veiculo.veiTxNome }}" 
                     class="w-full h-40 object-cover rounded-lg mb-4">
                <div class="text-center">
                  <div class="text-xl font-bold text-gray-800">{{ reserva.veiculo.veiTxNome }}</div>
                  <div class="text-gray-600 mt-2">Marca: {{ reserva.veiculo.veiTxMarca }}</div>
                  <div class="text-gray-600">Tipo: {{ reserva.veiculo.veiTxTipo }}</div> 
                </div>
                <button (click)="cancelarReserva(reserva.vusNrId)" class="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
                  Cancelar Reserva
                </button>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </custom-background>
  `,
  imports: [CustomBackgroundComponent, CustomMenuComponent, CommonModule],
})
export class MinhasReservasComponent implements OnInit {
  usuario: JwtPayload | null = null;
  reservas: (ReservaVeiculo & { veiculo: Veiculo, imagemPrincipal?: ImagemVeiculo })[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarioAtual().subscribe(usuario => {
      this.usuario = usuario;
      if (this.usuario && this.usuario.payload) {
        this.carregarReservas(this.usuario.payload.usuNrId);
      } else {
        console.error('Erro ao carregar usuário: Usuário não está logado');
      }
      if (usuario && usuario.payload.roles.includes('ROLE_ADMIN')) {
        this.menuItems.splice(1, 0, { label: 'Painel Administrador', route: '/admin', type: 'text' });
      }
    });
  }

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  carregarReservas(usuNrId: number): void {
    this.veiculoService.getReservasByUsuario(usuNrId).subscribe(reservas => {
      const reservasComVeiculo = reservas.map(reserva => {
        return this.veiculoService.getVeiculoById(reserva.veiNrId).toPromise().then(veiculo => {
          if (veiculo) {
            return { ...reserva, veiculo };
          }
          return null;
        });
      });

      Promise.all(reservasComVeiculo).then(result => {
        this.reservas = result.filter(reserva => reserva !== null) as (ReservaVeiculo & { veiculo: Veiculo, imagemPrincipal?: ImagemVeiculo })[];
        this.reservas.forEach(reserva => {
          this.veiculoService.getImagensByVeiculoId(reserva.veiculo.veiNrId).subscribe(imagens => {
            if (imagens.length > 0) {
              reserva.imagemPrincipal = imagens[0];
            }
          });
        });
      });
    });
  }

  cancelarReserva(vusNrId: number): void {
    this.veiculoService.excluirReservaVeiculo(vusNrId).subscribe(() => {
      this.reservas = this.reservas.filter(reserva => reserva.vusNrId !== vusNrId);
      alert('Reserva cancelada com sucesso!');
    }, error => {
      console.error('Erro ao cancelar reserva:', error);
      alert('Erro ao cancelar reserva.');
    });
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
