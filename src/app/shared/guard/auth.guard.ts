import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UsuarioService } from "../service/usuario.service";

export const acessoPermitido: CanActivateFn = () => true;

export const acessoNegado: CanActivateFn = () => false;


export const acessoAutenticado: CanActivateFn = () => {
    const authService = inject(UsuarioService);
    const router = inject(Router);

    return authService.isAuthenticated() || router.createUrlTree(['/login']);
};
