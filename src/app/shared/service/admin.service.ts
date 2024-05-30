import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Perfil } from '../model/perfil';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  #http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor() { }

  getUsuarios(): Observable<Usuario[]> {
    return this.#http.get<Usuario[]>(`${this.baseUrl}/listarUsuarios`);
  }
  criarPerfil(perTxNome: string): Observable<Perfil> {
    const params = new HttpParams().set("perTxNome", perTxNome);
    return this.#http.post<Perfil>(`${this.baseUrl}/criarPerfil`, null, { params });
  }
  getPerfis(): Observable<Perfil[]> {
    return this.#http.get<Perfil[]>(`${this.baseUrl}/listarPerfis`);
  }

}
