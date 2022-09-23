//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Imports

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Interface definition

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Decorator definition

@Injectable({
  providedIn: 'root',
})

//******************************************************************** */
//******************************************************************** */
//******************************************************************** */
// Guard definition
export class ExitGuard implements CanDeactivate<unknown> {
  //************************************* */
  //************************************* */

  canDeactivate(
    component: OnExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.onExit ? component.onExit() : false;
  }
}
