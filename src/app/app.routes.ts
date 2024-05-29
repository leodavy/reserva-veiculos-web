import { Routes } from '@angular/router';
import { LoginComponent } from './view/login.component';
import { RegistroComponent } from './view/registro.component';
import { AcessoAutenticado, AcessoAdmin } from './shared/guard/auth.guard'; // Importamos as classes de guarda
import { HomeComponent } from './view/home.component';
import { AdminComponent } from './view/admin.component';
import { ListagemUsuariosComponent } from './view/listagem-usuarios.component';


export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    { path: 'home', canActivate: [AcessoAutenticado], component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'admin', canActivate: [AcessoAutenticado, AcessoAdmin], component: AdminComponent }, 
    { path: 'admin/listagem-usuarios', canActivate: [AcessoAutenticado, AcessoAdmin], component: ListagemUsuariosComponent },
    { path: '**', redirectTo: 'login' }
];
