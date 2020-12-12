import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  isLoggedIn: Observable<boolean | null>;

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
