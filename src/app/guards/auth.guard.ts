//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */
// Imports

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../modules/shared/services/token.service';
import { Router } from '@angular/router';

//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */
// Decorator definition

@Injectable({
  providedIn: 'root',
})

//*************************************************************************** */
//*************************************************************************** */
//*************************************************************************** */
// Guard definition
export class AuthGuard implements CanActivate {
  //**************************************** */
  //**************************************** */
  // Constructor

  constructor(private tokenService: TokenService, private router: Router) {}

  //**************************************** */
  //**************************************** */
  //Methods

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
