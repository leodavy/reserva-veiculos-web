import { Routes } from '@angular/router';
import { LoginComponent } from './view/login.component';
import { RegistroComponent } from './view/registro.component';
import { acessoAutenticado } from './shared/guard/auth.guard';
import { HomeComponent } from './view/home.component';


export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {path:'home',canActivate: [acessoAutenticado],component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: '**', redirectTo: 'login'}
];