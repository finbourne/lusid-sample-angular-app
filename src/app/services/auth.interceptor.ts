import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return from(this.authService.token).pipe(
      tap({
        error: () => this.authService.logOut()
      }),
      map(token => token
        ? request.clone({ headers: request.headers.append('Authorization', 'Bearer ' + token) })
        : request
      ),
      mergeMap(readyRequest => next.handle(readyRequest)),
      tap({
        error: err => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.authService.logOut();
          }
        }
      })
    );
  }

}
