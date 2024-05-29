import { Routes } from '@angular/router';
import { LoginComponent } from './view/login.component';
import { RegistroComponent } from './view/registro.component';
import { AcessoAutenticado, AcessoAdmin } from './shared/guard/auth.guard'; 
import { HomeComponent } from './view/home.component';
import { AdminComponent } from './view/admin.component';
import { ListagemUsuariosComponent } from './view/listagem-usuarios.component';
import { GerenciarPerfisComponent } from './view/gerenciar-perfis.component';


export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    { path: 'home', canActivate: [AcessoAutenticado], component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'admin', canActivate: [AcessoAutenticado, AcessoAdmin], component: AdminComponent }, 
    { path: 'admin/listagem-usuarios', canActivate: [AcessoAutenticado, AcessoAdmin], component: ListagemUsuariosComponent },
    { path: 'admin/gerenciar-perfis', canActivate: [AcessoAutenticado, AcessoAdmin], component: GerenciarPerfisComponent },
    { path: '**', redirectTo: 'login' }
];
