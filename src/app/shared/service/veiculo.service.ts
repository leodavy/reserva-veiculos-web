import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Veiculo } from '../model/veiculo';
import { ImagemVeiculo } from '../model/imagem-veiculo';
import { ReservaVeiculo } from '../model/reserva-veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private baseUrl = `${environment.apiUrl}/veiculos`;

  constructor(private http: HttpClient) { }

  listaVeiculos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarVeiculos`);
  }

  cadastrarVeiculo(veiculo: Veiculo): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/cadastrarVeiculo`, veiculo, { headers, responseType: 'text' });
  }

  getImagensByVeiculoId(veiNrId: number): Observable<ImagemVeiculo[]> {
    return this.http.get<ImagemVeiculo[]>(`${this.baseUrl}/${veiNrId}/imagens`);
  }

  adicionarImagem(veiculoId: number, imagem: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagem', imagem);
    return this.http.post(`${this.baseUrl}/${veiculoId}/adicionarImagem`, formData);
  }

  excluirImagemVeiculo(veiNrId: number, imvNrId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluirImagemVeiculo/${veiNrId}/${imvNrId}`);
  }

  getImagemById(imvNrId: number): Observable<ImagemVeiculo> {
    return this.http.get<ImagemVeiculo>(`${this.baseUrl}/imagens/${imvNrId}`);
  }

  getVeiculoById(veiNrId: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.baseUrl}/${veiNrId}`);
  }

  atualizarImagemVeiculo(veiculoId: number, imvNrId: number, imagem: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagem', imagem);
  
    return this.http.put(`${this.baseUrl}/atualizarImagemVeiculo/${veiculoId}/${imvNrId}`, formData);
  }

  atualizarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.baseUrl}/atualizarVeiculo/${veiculo.veiNrId}/`, veiculo);
  }

  excluirVeiculo(veiNrId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluirVeiculo/${veiNrId}`);
  }

  reservarVeiculo(veiNrId: number, usuNrId: number, dataReserva: string): Observable<any> { // Alterado para string
    const reserva = { veiNrId, usuNrId, vusDtDate: dataReserva };
    return this.http.post<any>(`${this.baseUrl}/reservarVeiculo`, reserva);
  }

  getReservasVeiculo(veiNrId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${veiNrId}/reservas`);
  }

  getReservas(): Observable<ReservaVeiculo[]> {
    return this.http.get<ReservaVeiculo[]>(`${this.baseUrl}/reservas`);
  }
  getReservasByUsuario(usuNrId: number): Observable<ReservaVeiculo[]> {
    return this.http.get<ReservaVeiculo[]>(`${this.baseUrl}/reservas/${usuNrId}`);
  }
}
