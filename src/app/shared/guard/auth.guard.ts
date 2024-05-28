import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../modules/auth/service/auth.service";

export const acessoPermitido: CanActivateFn = () => true;

export const acessoNegado: CanActivateFn = () => false;


export const acessoAutenticado: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated() || router.createUrlTree(['/login']);
};
