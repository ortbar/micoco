import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Partida } from './partida-model';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000'; // Ajusta esta URL a tu API

enviarPartida(partida: Partida): Observable<Partida> {
  return this.http.post<Partida>(this.apiUrl + '/partida', partida);
}

getPartidas(): Observable<Partida[]> {
  return this.http.get<Partida[]>(this.apiUrl + '/partidas');
}

getPartidasUserID(id: string): Observable<Partida[]> {
  return this.http.get<Partida[]>(this.apiUrl + '/partidas/' + id);
}



}
