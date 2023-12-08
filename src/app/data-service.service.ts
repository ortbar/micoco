import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Usuario } from './user.model';
import { ApiResponse } from './registro-component/api-response.interface';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private apiUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200' // aqui en el lado del cliente le estamos diciendo al servidor el origen donde se ejucuta mi app 4200
      //Asegúrate de que este sea tu origen
    });

    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  // crearUsuario(usuario: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
  // }


  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, user);

  }

  updateUser(userId: number, updatedUser: any): Observable<Usuario> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${userId}`, updatedUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${userId}`);
  }

  // --------------------------------------------------------------------------------------------------//

  // El componente le pide al servicio los detalles del usuario con un ID específico.
  getUserById(userId: number): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/${userId}`;

    //  El servicio realiza una solicitud HTTP y devuelve un observable.
    // Cuando la solicitud HTTP se completa, el componente recibe los datos del usuario y los asigna a sus propiedades.
    return this.http.get<any>(url).pipe(
      map((response: any[]) => {
        if (response && response.length > 0) {
          const usuarioData = response[0];
          return {
            id: usuarioData.id,
            nombre: usuarioData.nombre,
            email: usuarioData.email,
            contrasena: usuarioData.contrasena,
            rol: usuarioData.rol,
            tema_interfaz: usuarioData.tema_interfaz,
            idioma: usuarioData.idioma,
            ultimo_acceso: usuarioData.ultimo_acceso
          } as Usuario;
        } else {
          // Manejar el caso en que no se encuentra un usuario
          console.error('No se encontró el usuario');
          throw new Error('Usuario no encontrado');
        }
      }),
      catchError(error => {
        console.error('Error al obtener el usuario:', error);
        throw error;
      })
    );
  }

  
  registerUser(user: Usuario): Observable<ApiResponse> {
    const url = `${this.apiUrl}/registro`;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
  
    return this.http.post<ApiResponse>(url, user, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
  
        // Verifica si el error proviene del servidor y contiene un objeto de error
        if (error.error && error.error.error && error.error.error.message) {
          return throwError(() => new Error(error.error.error.message));
        } else {
          return throwError(() => new Error('Ocurrió un error en la solicitud.'));
        }
      })
    );
  }

  // getUsuarios(): Observable<any[]> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': 'http://localhost:4200' // aqui en el lado del cliente le estamos diciendo al servidor el origen donde se ejucuta mi app 4200
  //     //Asegúrate de que este sea tu origen
  //   });

  //   return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  // }




  // loginUser(credentials: { email: string; contrasena: string }): Observable<any> {
  //   const url = `${this.apiUrl}/login`; // Ajusta la URL según tu backend
  //   return this.http.post<any>(url, credentials);
  // }







}
