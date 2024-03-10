import { Injectable, Injector, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


@Injectable()
export class Navegate {
  constructor(private router: Router) { }
  navigate(url: string): boolean {
    console.log(`Navigating to: ${url}`);
    this.router.navigate([url]); // Fix: Pass the URL as an array
    return false;
  }
}

export const authGuardGuard: CanActivateFn = (route, state) => {

  const isAuthenticated = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('rol');
  console.log('isAuthenticated:', isAuthenticated);

  return isAuthenticated && userRole == 'jugador' ? true : inject(Navegate).navigate('/unauthorized'); // Returning boolean for allowing access


  // if (isAuthenticated) {
  //   if (userRole === 'jugador') {
  //     window.location.href = '/index'; // Returning UrlTree for redirection
  //   }
  //   return isAuthenticated && userRole == 'jugador' ? true : false; // Returning boolean for allowing access
  // } else {
  //   window.location.href = '/unauthorized'; // Returning UrlTree for redirection
  //   return false;
  // }
};
