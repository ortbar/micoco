export interface ApiResponse {
  success: boolean;
  mensaje: string;
  error?: {
    message: string;
    code?: string;
    details?: any; // Puedes agregar detalles adicionales según tus necesidades
    // Otras propiedades según lo que devuelva tu servidor
  };
  // Otras propiedades según lo que devuelva tu servidor
}