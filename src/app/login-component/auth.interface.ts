export interface Token {
    token: string;
    user: User;
    //expiresIn: number;
    // Otras propiedades del token, si las hay
  }

export interface User{
  nombre:string;
  email:string;
  rol:string;
}