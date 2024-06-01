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

  addImagemVeiculo(veiNrId: number, formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${veiNrId}/adicionarImagem`, formData)
      .pipe(
        map(response => response as string),
        catchError(error => {
          console.error('Erro ao adicionar imagem:', error);
          return of('Erro ao adicionar imagem. Tente novamente mais tarde.');
        })
      );
  }


  getImagemById(imvNrId: number): Observable<ImagemVeiculo> {
    return this.http.get<ImagemVeiculo>(`${this.baseUrl}/imagens/${imvNrId}`);
  }

}
