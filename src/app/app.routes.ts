import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login.component';
import { RegistroComponent } from './modules/auth/components/registro.component';
import { acessoAutenticado } from './shared/guard/auth.guard';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {path:'home',canActivate: [acessoAutenticado],component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: '**', redirectTo: 'login'}
];