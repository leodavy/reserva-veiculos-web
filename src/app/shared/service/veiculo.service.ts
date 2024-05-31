import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Veiculo } from '../model/veiculo';
import { ImagemVeiculo } from '../model/imagem-veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private baseUrl = `${environment.apiUrl}/veiculos`;

  constructor(private http: HttpClient) {}
  
  listaVeiculos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarVeiculos`);
  }

  cadastrarVeiculo(veiculo: Veiculo): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastrarVeiculo`, veiculo);
  }
  
  getImagensByVeiculoId(veiculoId: number): Observable<ImagemVeiculo[]> {
    return this.http.get<ImagemVeiculo[]>(`${this.baseUrl}/veiculo/${veiculoId}`);
  }

  getImagemById(imagemId: number): Observable<ImagemVeiculo> {
    return this.http.get<ImagemVeiculo>(`${this.baseUrl}/${imagemId}`);
  }
 
}
