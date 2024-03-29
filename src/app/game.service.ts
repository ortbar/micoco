import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Partida } from './partida-model';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';
  acertijoActual: any;


  getAcertijos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/acertijos`);
    
  }

  getAcertijoById(id: number): Observable<any> {
    const url = `${this.apiUrl}/acertijos/${id}`;
    return this.http.get<any>(url);
  }

  addacertijo(acertijo: any): Observable<any> { // recibe un acertijo de tipo any
    return this.http.post<any>(`${this.apiUrl}/anadecertijo`, acertijo);
  }

  enviarPartida(partida: Partida): Observable<Partida> {
    return this.http.post<any>(this.apiUrl + '/partida', partida);
  }

  
}
