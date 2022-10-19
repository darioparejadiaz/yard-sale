//****************************************************************** */
//****************************************************************** */
//****************************************************************** */
// Imports

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

//****************************************************************** */
//****************************************************************** */
//****************************************************************** */
// Decorator definition

@Injectable()

//****************************************************************** */
//****************************************************************** */
//****************************************************************** */
// Interceptor definition
export class TokenInterceptor implements HttpInterceptor {
  //********************************** */
  //********************************** */
  // Constructor

  constructor(private tokenService: TokenService) {}

  //********************************** */
  //********************************** */
  // Methods

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  //**************************** */

  private addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.tokenService.getToken();

    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });

      return authReq;
    }

    return request;
  }
}
