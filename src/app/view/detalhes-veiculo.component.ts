import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomBackgroundComponent } from '../shared/components/custom-background/custom-background.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../shared/model/menu-item';
import { UsuarioService } from '../shared/service/usuario.service';
import { VeiculoService } from '../shared/service/veiculo.service';
import { Veiculo } from '../shared/model/veiculo';
import { CustomMenuComponent } from '../shared/components/custom-menu/custom-menu.component';
import { JwtPayload } from '../shared/interceptors/JwtPayload';
import { ImagemVeiculo } from '../shared/model/imagem-veiculo';

@Component({
  selector: 'detalhes-veiculo',
  standalone: true,
  template: `
<custom-background>
  <custom-menu [menuItems]="menuItems"></custom-menu>
  <div *ngIf="veiculo" class="mt-12 p-12 flex justify-center items-center flex-col">
    <h1 class="text-preto text-4xl font-bold mb-6">{{ veiculo.veiTxNome }}</h1>
    <div class="bg-white border border-gray-300 p-8 rounded-lg shadow-lg w-[600px]">
      <img *ngIf="imagemPrincipal"
           [src]="imagemPrincipal.base64"
           alt="{{ veiculo.veiTxNome }}"
           class="w-full h-40 object-cover rounded-lg mb-4">
      <div class="text-center">
        <div class="text-xl font-bold text-gray-800">Marca: {{ veiculo.veiTxMarca }}</div>
        <div class="text-gray-600 mt-2">Tipo: {{ veiculo.veiTxTipo }}</div>
        <button (click)="reservarVeiculo(veiculo.veiNrId)" class="mt-4 px-6 py-2 bg-secondary text-branco rounded-full hover:bg-blue-700 shadow-lg">
          Fazer Reserva
        </button>
        <!-- <button *ngIf="isOwner()" (click)="editarVeiculo(veiculo.veiNrId)" class="mt-4 px-6 py-2 bg-secondary text-branco rounded-full hover:bg-blue-700 shadow-lg">
          Editar Veículo
        </button> -->
      </div>
    </div>
  </div>
</custom-background>
  `,
  imports: [
    CustomBackgroundComponent,
    CommonModule,
    CustomMenuComponent,
  ]
})
export class DetalhesVeiculoComponent implements OnInit {
  veiculo: Veiculo | null = null;
  imagemPrincipal: { base64: string, imvTxExtensao: string } | null = null;
  usuarioId: number | null = null;
  usuario: JwtPayload | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoService: VeiculoService,
    private usuarioService: UsuarioService
  ) { }

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  ngOnInit(): void {
    const veiculoId = this.route.snapshot.params['veiNrId'];
    this.veiculoService.getVeiculoById(veiculoId).subscribe(veiculo => {
      this.veiculo = veiculo;
      this.loadImagemPrincipal(veiculo.veiNrId);
    });
    this.usuarioService.getUsuarioAtual().subscribe(usuario => {
      console.log('Usuário logado:', usuario);
      this.usuario = usuario;
    });
  }

  loadImagemPrincipal(veiculoId: number): void {
    this.veiculoService.getImagensByVeiculoId(veiculoId).subscribe(imagens => {
      if (imagens.length > 0) {
        const imagem = imagens[0];
        this.convertBlobToBase64(imagem.imvBtBytes).then(base64String => {
          this.imagemPrincipal = {
            base64: base64String,
            imvTxExtensao: imagem.imvTxExtensao
          };
        });
      }
    });
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  reservarVeiculo(veiculoId: number): void {
    this.router.navigate(['/reservar', veiculoId]);
  }

  editarVeiculo(veiculoId: number): void {
    this.router.navigate(['/editar-veiculo', veiculoId]);
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
