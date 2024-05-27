import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login.component';
import { RegistroComponent } from './modules/auth/components/registro.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    // {
    //     path:'home',
    //     canActivate: [acessoAutenticado],
    //     component: ManagementScreenComponent,
    // },
    {path: 'login',component: LoginComponent},
    {path: 'registro', component: RegistroComponent}

   
];