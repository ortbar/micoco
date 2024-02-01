import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './login-component/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const currentRole = this.authService.getUserRole();

    if (this.authService.isAuthenticated()) {
      return true;
    }

  
    return this.router.parseUrl('');


  
  }

  




}