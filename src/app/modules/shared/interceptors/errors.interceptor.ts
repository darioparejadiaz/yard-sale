//************************************************************************ */
//************************************************************************ */
//************************************************************************ */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//************************************************************************ */
//************************************************************************ */
//************************************************************************ */

@Injectable()

//************************************************************************ */
//************************************************************************ */
//************************************************************************ */
export class ErrorsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError(() => new Error('No posee permisos suficientes'));
        } else if (error.status === 403) {
          return throwError(() => new Error('Acceso prohibido'));
        } else if (error.status === 404) {
          return throwError(() => new Error('Registro no encontrado'));
        } else {
          return throwError(() => new Error('Ha ocurrido un error inesperado'));
        }
      })
    );
  }
}
