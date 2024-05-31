import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UsuarioService } from "../service/usuario.service";
import { JwtPayload } from '../interceptors/JwtPayload';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcessoAutenticado implements CanActivate {

  constructor(private authService: UsuarioService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUsuarioAtual().pipe(
      map((jwtPayload: JwtPayload | null) => {
        if (jwtPayload && this.authService.isAuthenticated()) {
          return true;
        }
        return this.router.createUrlTree(['/login']);  
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AcessoAdmin implements CanActivate {

  constructor(private authService: UsuarioService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUsuarioAtual().pipe(
      map((jwtPayload: JwtPayload | null) => {
        if (jwtPayload && jwtPayload.payload.roles.includes('ROLE_ADMIN')) {
          return true; 
        }
        return this.router.createUrlTree(['/home']);  
      })
    );
  }
}
