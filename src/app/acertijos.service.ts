import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acertijo } from './game/acertijo.model';

@Injectable({
  providedIn: 'root'
})
export class AcertijosService {

  private apiUrl = 'http://localhost:3000'; // Ajusta esta URL a tu API

 

  constructor(private http:HttpClient) { }

  getAcertijos(): Observable<Acertijo[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200' // aqui en el lado del cliente le estamos diciendo al servidor el origen donde se ejucuta mi app 4200
      //Asegúrate de que este sea tu origen
    });
    return this.http.get<any>(this.apiUrl + '/acertijos');
  }

  getAcertijoById(id: number): Observable<Acertijo> {
    const url = `${this.apiUrl}/acertijos/${id}`;
   
    return this.http.get<Acertijo>(url);
   
  }

  addAcertijo(acertijo: Acertijo): Observable<Acertijo> {
    
    return this.http.post<Acertijo>(this.apiUrl + '/acertijos', acertijo);
  }

  deleteAcertijo(id: number): Observable<Acertijo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Acertijo>(url);
  }

  updateAcertijo(acertijo: Acertijo): Observable<Acertijo> {
    const url = `${this.apiUrl}/acertijos/${acertijo.id_ac}`;
    return this.http.put<Acertijo>(url, acertijo);
  }


}
