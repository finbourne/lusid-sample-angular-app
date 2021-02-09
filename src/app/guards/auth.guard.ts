import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';

import { routes } from 'app/app.routes';
import { AuthService } from 'app/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn()
      .pipe(
        filter(val => val !== undefined),
        take(1),
        tap(isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate([routes.home]);
          }
        })
      );
  }

}
