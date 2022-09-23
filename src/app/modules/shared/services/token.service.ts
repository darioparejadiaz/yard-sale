//************************************************************************ */
//************************************************************************ */
//************************************************************************ */
// Imports

import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

//************************************************************************ */
//************************************************************************ */
//************************************************************************ */
// Decorator definition

@Injectable({
  providedIn: 'root',
})

//************************************************************************ */
//************************************************************************ */
//************************************************************************ */
// Service definition
export class TokenService {
  //*********************************** */
  //*********************************** */
  // Constructor

  constructor() {}

  //*********************************** */
  //*********************************** */
  //Methods

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  //*********************** */

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  //*********************** */

  public deleteToken(): void {
    localStorage.removeItem('token');
  }

  //*********************** */

  public saveRole(role: 'customer' | 'admin'): void {
    localStorage.setItem('role', role);
  }

  //*********************** */

  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  //*********************** */

  public deleteRole(): void {
    localStorage.removeItem('role');
  }
}
