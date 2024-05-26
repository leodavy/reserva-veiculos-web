import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../../../shared/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/usuario`;  

  registrar(user: Usuario): Observable<Usuario> {
    return this.#http.post<Usuario>(`${this.baseUrl}/cadastrar`, user);
  }

  login(credentials: { login: string, senha: string }): Observable<any> {
    return this.#http.post(`${this.baseUrl}/autenticar`, credentials, { responseType: 'text' });
  }
}
