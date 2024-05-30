import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Perfil } from '../model/perfil';
import { UsuarioPerfil } from '../model/usuario-perfil';

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
  getPerfilById(perNrId: number): Observable<Perfil> {
    return this.#http.get<Perfil>(`${this.baseUrl}/perfil/${perNrId}`);
  }
  getTotalUsuarios(): Observable<number> {
    return this.#http.get<number>(`${this.baseUrl}/totalUsuarios`);
  }
  
  getTotalPerfis(): Observable<number> {
    return this.#http.get<number>(`${this.baseUrl}/totalPerfis`);
  }
  associarPerfilUsuario(usuNrId: number, perNrId: number): Observable<any> {
    const body = { usuNrId: usuNrId, perNrId: perNrId };
    return this.#http.post<any>(`${this.baseUrl}/associarPerfilUsuario`, body);
  }
  listarUsuariosAssociados(perNrId: number): Observable<UsuarioPerfil[]> {
    return this.#http.get<UsuarioPerfil[]>(`${this.baseUrl}/perfil/${perNrId}/listarUsuarios`);
  }

}
