import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameComponent } from './game/game.component';

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
}
