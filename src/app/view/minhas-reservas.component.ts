import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../shared/service/usuario.service";
import { VeiculoService } from "../shared/service/veiculo.service";
import { JwtPayload } from "../shared/interceptors/JwtPayload";
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "../shared/model/menu-item";

@Component({
  selector: 'minhas-reservas',
  standalone: true,
  template: ``
})
export class MinhasReservasComponent implements OnInit {
  usuario: JwtPayload | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const usuNrId = params['usuNrId'];
      if (usuNrId) {
        this.usuarioService.getUsuarioAtual().subscribe(usuario => {
          this.usuario = usuario;
          if (this.usuario && this.usuario.payload) {
            this.carregarUsuario(this.usuario.payload.usuNrId);
          } else {
            console.error('Erro ao carregar usuário: Usuário não está logado');
          }
        });
      } else {
        console.error('Erro ao carregar usuário: ID do usuário não está presente nos parâmetros');
      }
    });
  }

  menuItems: MenuItem[] = [
    { label: 'Início', route: '/home', type: 'text' },
    { label: 'Painel Administrador', route: '/admin', type: 'text' },
    { label: 'Sair', route: '', type: 'text', action: () => this.logout() },
  ];

  carregarUsuario(usuNrId: number): void {
    console.log('Carregando dados do usuário:', usuNrId);
  }

  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}