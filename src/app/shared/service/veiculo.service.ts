import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Veiculo } from '../model/veiculo';
import { ImagemVeiculo } from '../model/imagem-veiculo';
import { catchError, map, of } from 'rxjs';

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

  adicionarImagemVeiculo(veiNrId: number, novaImagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', novaImagem);
    return this.http.post(`${this.baseUrl}/${veiNrId}/adicionarImagem`, formData);
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

  atualizarImagemVeiculo(veiNrId: number, imvNrId: number, novaImagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', novaImagem);
    return this.http.put(`${this.baseUrl}/atualizarImagemVeiculo/${veiNrId}/${imvNrId}`, formData);
  }
  atualizarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.baseUrl}/atualizarVeiculo/${veiculo.veiNrId}/`, veiculo);
  }

}
