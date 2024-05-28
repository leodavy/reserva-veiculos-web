import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../../../shared/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/usuario`;  
  private tokenKey = 'authToken';

  registrar(user: Usuario): Observable<Usuario> {
    return this.#http.post<Usuario>(`${this.baseUrl}/cadastrar`, user);
  }

  login(credentials: { login: string, senha: string }): Observable<any> {
    return this.#http.post(`${this.baseUrl}/autenticar`, credentials, { responseType: 'text' }).pipe(
      tap((token: string) => {
        this.setToken(token);
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
  }
}
