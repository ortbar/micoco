import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Token, User } from './login-component/auth.interface';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) { }

  private apiUrl = 'http://localhost:3000';


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check if the token is expired
    return !this.jwtHelper.isTokenExpired(token);
  }

  

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public setUser(user: User) {
    localStorage.setItem('id', user.id.toString());
    localStorage.setItem('nombre', user.nombre);
    localStorage.setItem('email', user.email);
    localStorage.setItem('rol', user.rol);
  }

  
  public getUser(): string | null {
    return localStorage.getItem('id');
  }

  public getNombre(): string | null {
    return localStorage.getItem('nombre');
  }


  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserRole(): string | null {
  
    return localStorage.getItem('rol'); 
  }

  



  public removeToken(): void {
    localStorage.removeItem('token');
  }



  public removeUser() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
  }


  public iniciarSesion(email: string, contrasena: string): Observable<Token> {
    console.log('Haciendo solicitud de inicio de sesión');
    const credentials = { email, contrasena };
    console.log('URL de la solicitud: ', `${this.apiUrl}/iniciar-sesion`);
    return this.http.post<Token>(`${this.apiUrl}/iniciar-sesion`, credentials)
      .pipe(
        tap(() => {
          this.router.navigate(['index']);
        }),
        catchError((error: any) => {
          console.error('Error en inicio de sesión:', error);
          let errorMessage = 'Error en el inicio de sesión. Por favor, inténtalo de nuevo.';
          if (error.status === 401) {
            errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
          }
          return throwError(errorMessage);
        })
      );
  }

  cerrrarSesion() {
    this.removeToken();
    this.removeUser;
   
    this.router.navigate(['']);
  }

  mostrarMensaje: boolean = true;

  // aceptarCookies() {
  //   // Aquí deberías crear una cookie de aceptación de la política de cookies
  //   // Por simplicidad, vamos a usar localStorage en este ejemplo
  //   localStorage.setItem('politicaCookiesAceptada', 'true');
  //   this.mostrarMensaje = false;
  // }

  // cookieAceptada(): boolean {
  //   // Verifica si la cookie de aceptación de la política de cookies existe
  //   return localStorage.getItem('politicaCookiesAceptada') === 'true';
  // }


}