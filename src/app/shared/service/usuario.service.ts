import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtPayload } from '../interceptors/JwtPayload';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  #http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/usuario`;
  private tokenKey = 'authToken';
  private jwtHelper = new JwtHelperService();
  private usuarioLogadoSubject: BehaviorSubject<JwtPayload | null> = new BehaviorSubject<JwtPayload | null>(null);
  usuarioLogado$: Observable<JwtPayload | null> = this.usuarioLogadoSubject.asObservable();

  constructor() {
    const token = this.getToken();
    if (token) {
      const usuarioLogado = this.jwtHelper.decodeToken<JwtPayload>(token);
      this.usuarioLogadoSubject.next(usuarioLogado);
    }
  }

  registrar(user: Usuario): Observable<Usuario> {
    return this.#http.post<Usuario>(`${this.baseUrl}/cadastrar`, user);
  }

  login(credentials: { login: string, senha: string }): Observable<any> {
    return this.#http.post(`${this.baseUrl}/autenticar`, credentials, { responseType: 'text' }).pipe(
      tap((token: string) => {
        this.setToken(token);
        const decodedToken = this.jwtHelper.decodeToken<JwtPayload>(token);
        this.usuarioLogadoSubject.next(decodedToken);
        localStorage.setItem('usuarioLogado', JSON.stringify(decodedToken));
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogadoSubject.next(null);
  }

  getUsuarioAtual(): Observable<JwtPayload | null> {
    return this.usuarioLogado$;
  }

  getUsuarioById(usuNrId: number): Observable<Usuario> {
    return this.#http.get<Usuario>(`${this.baseUrl}/${usuNrId}`);
  }

}
