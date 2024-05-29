import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

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
}
