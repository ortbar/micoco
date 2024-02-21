import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Juego } from './juego-model';




@Injectable({
  providedIn: 'root'
})
export class JuegoServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000'; // Ajusta esta URL a tu API

  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.apiUrl + '/juegos');

  }



  

  addJuego(juego: Juego): Observable<Juego> {
    return this.http.post<Juego>(this.apiUrl + '/juegos', juego);
    
  } 
}
