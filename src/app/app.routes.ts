import { Routes } from '@angular/router';
import { LoginComponent } from './view/login.component';
import { RegistroComponent } from './view/registro.component';
import { AcessoAutenticado, AcessoAdmin } from './shared/guard/auth.guard'; 
import { HomeComponent } from './view/home.component';
import { AdminComponent } from './view/admin.component';
import { ListagemUsuariosComponent } from './view/listagem-usuarios.component';
import { GerenciarPerfisComponent } from './view/gerenciar-perfis.component';
import { PerfilComponent } from './view/perfil.component';
import { CadastrarVeiculoComponent } from './view/cadastrar-veiculo.component';
import { DetalhesVeiculoComponent } from './view/detalhes-veiculo.component';
import { MinhasReservasComponent } from './view/minhas-reservas.component';
import { LandingPageComponent } from './view/landing-page.component';


export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'inicio'
    },
    { path: 'home', canActivate: [AcessoAutenticado], component: HomeComponent },
    { path: 'home/cadastrar-veiculo', canActivate: [AcessoAutenticado], component: CadastrarVeiculoComponent }, 
    { path: 'home/detalhes-veiculo/:veiNrId', canActivate: [AcessoAutenticado], component: DetalhesVeiculoComponent }, 
    { path: 'home/minhas-reservas/:usuNrId', canActivate: [AcessoAutenticado], component: MinhasReservasComponent }, 
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: LandingPageComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'admin', canActivate: [AcessoAutenticado, AcessoAdmin], component: AdminComponent }, 
    { path: 'admin/listagem-usuarios', canActivate: [AcessoAutenticado, AcessoAdmin], component: ListagemUsuariosComponent },
    { path: 'admin/gerenciar-perfis', canActivate: [AcessoAutenticado, AcessoAdmin], component: GerenciarPerfisComponent },
    { path: 'admin/perfil/:perNrId', canActivate: [AcessoAutenticado, AcessoAdmin], component: PerfilComponent }, 
    { path: '**', redirectTo: 'login' }
];
