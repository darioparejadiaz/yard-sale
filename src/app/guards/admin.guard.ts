import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../modules/shared/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //   return this.authService.user$.pipe(
    //     map((user) => {
    //       console.log('GUARD:', user);
    //       if (user?.role === 'admin') {
    //         return true;
    //       } else {
    //         this.router.navigate(['/home']);
    //         return false;
    //       }
    //     })
    //   );
    // }
    const token = this.tokenService.getToken();
    const role = this.tokenService.getRole();
    if (token && role) {
      if (role === 'admin') {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
