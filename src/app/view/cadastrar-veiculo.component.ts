import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomBackgroundComponent } from "../shared/components/custom-background/custom-background.component";
import { CustomMenuComponent } from '../shared/components/custom-menu/custom-menu.component';
import { MenuItem } from '../shared/model/menu-item';
import { UsuarioService } from '../shared/service/usuario.service';
import { Router } from '@angular/router';
import { CustomButtonComponent } from "../shared/components/custom-button/custom-button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VeiculoService } from '../shared/service/veiculo.service';
import { CustomPopupComponent } from '../shared/components/custom-popup/custom-popup.component';
import { JwtPayload } from '../shared/interceptors/JwtPayload';
import { Usuario } from '../shared/model/usuario';

@Component({
  selector: 'cadastrar-veiculo',
  standalone: true,
  template: `
    <custom-background>
      <custom-menu [menuItems]="menuItems"></custom-menu>
      <div class="flex justify-center items-center h-screen">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 class="text-2xl font-bold mb-6 text-center text-w">Cadastro de Veículo</h2>
          <form [formGroup]="formGroup" (ngSubmit)="cadastrar()">
            <div class="mb-4">
              <label for="nome" class="block text-sm font-medium text-preto">Nome do Veículo</label>
              <input type="text" id="nome" formControlName="veiTxNome" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div class="mb-6">
              <label for="marca" class="block text-sm font-medium text-preto">Marca do Veículo</label>
              <input type="text" id="marca" formControlName="veiTxMarca" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div class="mb-6">
              <label for="tipo" class="block text-sm font-medium text-preto">Tipo do Veículo</label>
              <input type="text" id="tipo" formControlName="veiTxTipo" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <custom-button [buttonText]="'Cadastrar'"></custom-button>      
          </form>
        </div>
        <custom-popup></custom-popup>
      </div>
    </custom-background>
  `,
  imports: [
    CustomBackgroundComponent,
    CustomMenuComponent,
    CustomButtonComponent,
    ReactiveFormsModule,
    CustomPopupComponent
  ]
})
export class CadastrarVeiculoComponent implements OnInit{
  @ViewChild(CustomPopupComponent) popup!: CustomPopupComponent;
  usuario: JwtPayload | null = null;


  constructor(
    private usuarioService: UsuarioService,
    private veiculoService: VeiculoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAtual().subscribe(usuario => {
      console.log('Usuário logado:', usuario);
      this.usuario = usuario;
      if (this.usuario) {
        this.formGroup.get('usuNrId')?.setValue(this.usuario.payload.usuNrId);
      }
      if (usuario && usuario.payload.roles.includes('ROLE_ADMIN')) {
        this.menuItems.splice(1, 0, { label: 'Painel Administrador', route: '/admin', type: 'text' });
      }
    });
  }

  formGroup: FormGroup = new FormGroup({
    veiTxNome: new FormControl<string>('', [Validators.required]),
    veiTxMarca: new FormControl<string>('', [Validators.required]),
    veiTxTipo: new FormControl<string>('', [Validators.required]),
    usuNrId: new FormControl<number | null>(null, [Validators.required])  });

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

  cadastrar(): void {
    if (this.formGroup.valid) {
      this.veiculoService.cadastrarVeiculo(this.formGroup.value).subscribe({
        next: () => {
          this.popup.show('Veículo cadastrado com sucesso!');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erro ao cadastrar veículo:', err);
        }
      });
    }
  }
}
