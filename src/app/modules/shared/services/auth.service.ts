//******************************************************************* */
//******************************************************************* */
//******************************************************************* */
// Imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

//******************************************************************* */
//******************************************************************* */
//******************************************************************* */
// Decorator definition

@Injectable({
  providedIn: 'root',
})

//******************************************************************* */
//******************************************************************* */
//******************************************************************* */
// Service definition
export class AuthService {
  //**************************************** */
  //**************************************** */
  // Attributes and properties

  private baseUrl: string = 'https://young-sands-07814.herokuapp.com/api/auth';
  private loginUrl: string = `${this.baseUrl}/login`;
  private profileUrl: string = `${this.baseUrl}/profile`;

  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  //**************************************** */
  //**************************************** */
  // Constructor

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  //**************************************** */
  //**************************************** */
  // Methods

  login(email: string, password: string): Observable<Auth> {
    return this.http
      .post<Auth>(this.loginUrl, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  //********************************* */

  // getProfile(token: string){
  //   return this.http.get<User>(this.profileUrl, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   });
  // }

  //********************************* */

  getProfile() {
    return this.http.get<User>(this.profileUrl).pipe(
      tap((profile) => {
        this.user.next(profile);
      })
    );
  }

  //********************************* */

  getCustomerProfile() {
    return this.http
      .get<User>(this.profileUrl)
      .pipe(
        map((user) => {
          const customerUser: User = {
            ...user,
            role: 'customer',
          };
          return customerUser;
        })
      )
      .pipe(
        tap((user) => {
          this.tokenService.saveRole('customer');
          this.user.next(user);
        })
      );
  }

  //********************************* */

  getAdminProfile() {
    return this.http
      .get<User>(this.profileUrl)
      .pipe(
        map((user) => {
          const adminUser: User = {
            ...user,
            role: 'admin',
          };
          return adminUser;
        })
      )
      .pipe(
        tap((user) => {
          this.tokenService.saveRole('admin');
          this.user.next(user);
        })
      );
  }

  //********************************* */

  public logout(): void {
    this.user.next(null);
    this.tokenService.deleteToken();
    this.tokenService.deleteRole();
  }
}
