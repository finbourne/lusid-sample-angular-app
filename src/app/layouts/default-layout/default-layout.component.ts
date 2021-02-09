import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { routes } from 'app/app.routes';
import { AuthService } from 'app/services';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

  isLoggedIn: Observable<boolean | null>;
  routes = routes;

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  logIn(): void {
    this.authService.logIn();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
