import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomBackgroundComponent } from '../shared/components/custom-background/custom-background.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../shared/model/menu-item';
import { UsuarioService } from '../shared/service/usuario.service';
import { VeiculoService } from '../shared/service/veiculo.service';
import { Veiculo } from '../shared/model/veiculo';
import { CustomMenuComponent } from '../shared/components/custom-menu/custom-menu.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'detalhes-veiculo',
  standalone: true,
  template: `
    <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div *ngIf="veiculo" class="mt-12 p-12 flex justify-center items-center flex-col">
        <h1 class="text-preto text-4xl font-bold mb-6">{{ veiculo.veiTxNome }}</h1>
        <div class="bg-white border border-gray-300 p-8 rounded-lg shadow-lg w-[800px]">
          <div *ngIf="imagens.length" class="image-container grid grid-cols-3 gap-4 justify-center">
            <div *ngFor="let imagem of imagens" class="image-item relative">
              <img [src]="imagem.base64"
                   [alt]="veiculo.veiTxNome + ' - ' + imagem.imvTxExtensao"
                   class="w-full h-auto max-w-full block">
              <button (click)="selecionarImagem(imagem.imvNrId)" class="absolute top-0 right-8 text-primary p-2 rounded-full">
                <fa-icon class="text-red text-xl" [icon]="['fas','pen-to-square']"></fa-icon>
              </button>
              <button (click)="excluirImagem(imagem.imvNrId)" class="absolute top-0 right-0 text-red-500 p-2 rounded-full ml-2">
                <fa-icon class="text-red text-xl" [icon]="['fas','trash']"></fa-icon>
              </button>
            </div>
          </div>
          <div class="text-center mb-4 ">
            <button (click)="selecionarImagem()" class="bg-blue-500 text-white px-4 py-2 rounded-full">
              Adicionar Imagem
            </button>
          </div>
          <div class="text-center">
            <div class="mb-4">
              <label class="block text-xl font-bold text-gray-800">Nome:</label>
              <input [(ngModel)]="veiculo.veiTxNome" (ngModelChange)="onChange()" class="border p-2 rounded-lg w-full">
            </div>
            <div class="mb-4">
              <label class="block text-xl font-bold text-gray-800">Marca:</label>
              <input [(ngModel)]="veiculo.veiTxMarca" (ngModelChange)="onChange()" class="border p-2 rounded-lg w-full">
            </div>
            <div class="mb-4">
              <label class="block text-xl font-bold text-gray-800">Tipo:</label>
              <input [(ngModel)]="veiculo.veiTxTipo" (ngModelChange)="onChange()" class="border p-2 rounded-lg w-full">
            </div>
            <button (click)="reservarVeiculo()" class="mt-4 px-6 py-2 bg-secondary text-branco rounded-full hover:bg-blue-700 shadow-lg">
              Fazer Reserva
            </button>
            <button *ngIf="alteracoesPendentes" (click)="salvarAlteracoes()" class="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-700 shadow-lg">
              Salvar Alterações
            </button>
          </div>
          <div class="text-center mt-4">
            <button (click)="excluirVeiculo()" class="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 shadow-lg">
              Excluir Veículo
            </button>
          </div>
        </div>
      </div>
      <input type="file" id="fileInput" (change)="onFileSelected($event)" hidden>
    </custom-background>
  `,
  imports: [
    CustomBackgroundComponent,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    CustomMenuComponent,
  ]
})
export class DetalhesVeiculoComponent implements OnInit {
  veiculo: Veiculo | null = null;
  imagens: { base64: string | null, imvTxExtensao: string, imvNrId: number }[] = [];
  alteracoesPendentes = false;
  usuarioId: number | null = null;

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
    this.carregarVeiculo(veiculoId);
    this.usuarioService.getUsuarioAtual().subscribe(usuario => {
      if (usuario) {
        this.usuarioId = usuario.payload.usuNrId;
      }
    });
  }

  carregarVeiculo(veiNrId: number): void {
    this.veiculoService.getVeiculoById(veiNrId).subscribe(veiculo => {
      this.veiculo = veiculo;
      this.carregarImagens(veiculo.veiNrId);
      this.verificarReserva(veiculo.veiNrId);
    });
  }

  carregarImagens(veiNrId: number): void {
    this.veiculoService.getImagensByVeiculoId(veiNrId)
      .subscribe(
        imagens => {
          this.imagens = imagens.map(imagem => ({
            base64: 'data:image/jpeg;base64,' + imagem.imvBtBytes,
            imvTxExtensao: imagem.imvTxExtensao,
            imvNrId: imagem.imvNrId
          }));
        },
        error => {
          console.error('Erro ao carregar imagens:', error);
        }
      );
  }

  verificarReserva(veiNrId: number): void {
    this.veiculoService.getReservasVeiculo(veiNrId).subscribe(reservas => {
      if (reservas && reservas.length > 0) {
        this.router.navigate(['/home']);
      }
    });
  }

  onChange(): void {
    this.alteracoesPendentes = true;
  }

  selecionarImagem(imvNrId?: number): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (imvNrId !== undefined) {
      fileInput.dataset['imvNrId'] = imvNrId.toString();
    } else {
      delete fileInput.dataset['imvNrId'];
    }
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const imvNrId = input.dataset['imvNrId'];

      if (imvNrId) {
        this.veiculoService.atualizarImagemVeiculo(this.veiculo!.veiNrId, parseInt(imvNrId), file).subscribe(
          () => {
            this.atualizarPagina();
          },
          error => {
            console.error('Erro ao atualizar imagem:', error);
          }
        );
      } else {
        this.veiculoService.adicionarImagem(this.veiculo!.veiNrId, file).subscribe(
          () => {
            this.atualizarPagina();
          },
          error => {
            console.error('Erro ao adicionar imagem:', error);
          }
        );
      }
    }
  }

  excluirImagem(imvNrId: number): void {
    this.veiculoService.excluirImagemVeiculo(this.veiculo!.veiNrId, imvNrId).subscribe(
      () => {
        this.atualizarPagina();
      },
      error => {
        console.error('Erro ao excluir imagem:', error);
      }
    );
  }

  excluirVeiculo(): void {
    if (this.veiculo) {
      this.veiculoService.excluirVeiculo(this.veiculo.veiNrId).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  salvarAlteracoes(): void {
    this.veiculoService.atualizarVeiculo(this.veiculo!).subscribe(() => {
      this.alteracoesPendentes = false;
      this.atualizarPagina();
    });
  }

  reservarVeiculo(): void {
    if (this.veiculo && this.usuarioId) {
      const dataAtual = new Date();
      const dataReserva = this.formatarData(dataAtual);
  
      this.veiculoService.reservarVeiculo(this.veiculo.veiNrId, this.usuarioId, dataReserva).subscribe(
        () => {
          alert('Reserva realizada com sucesso!');
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Erro ao reservar veículo:', error);
          alert('Erro ao reservar veículo.');
        }
      );
    }
  }

  private formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

  atualizarPagina(): void {
    window.location.reload();
  }
}
