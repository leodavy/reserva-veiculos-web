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
      <div *ngIf="imagens" class="image-container grid grid-cols-3 gap-4">
      <div *ngFor="let imagem of imagens" class="image-item">
  <img [src]="imagem.base64 ? imagem.base64 : 'assets/placeholder-image.jpg'" [alt]="veiculo.veiTxNome + ' - ' + imagem.imvTxExtensao">
</div>

      </div>
      <div class="text-center">
        <div class="text-xl font-bold text-gray-800">Marca: {{ veiculo.veiTxMarca }}</div>
        <div class="text-gray-600 mt-2">Tipo: {{ veiculo.veiTxTipo }}</div>
        <button (click)="reservarVeiculo(veiculo.veiNrId)" class="mt-4 px-6 py-2 bg-secondary text-branco rounded-full hover:bg-blue-700 shadow-lg">
          Fazer Reserva
        </button>
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
  imagens: { base64: string | null, imvTxExtensao: string }[] = [];
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
      this.carregarImagens(veiculo.veiNrId);
    });
    this.usuarioService.getUsuarioAtual().subscribe(usuario => {
      console.log('Usuário logado:', usuario);
      this.usuario = usuario;
    });
  }

  carregarImagens(veiNrId: number): void {
    this.veiculoService.getImagensByVeiculoId(veiNrId)
      .subscribe(
        imagens => {
          this.imagens = imagens.map(imagem => ({
            base64: 'data:image/jpeg;base64,' + imagem.imvBtBytes,
            imvTxExtensao: imagem.imvTxExtensao
          }));
        },
        error => {
          console.error('Erro ao carregar imagens:', error);
        }
      );
  }
  
  
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64WithoutMetadata = base64String.split(',')[1];
        resolve(base64WithoutMetadata);
      };
      reader.onerror = error => reject(error);
    });
  }
  
  
  

  reservarVeiculo(veiculoId: number): void {
    this.router.navigate(['/reservar', veiculoId]);
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}