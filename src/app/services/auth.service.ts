import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IOktaAuth, IOktaTokens } from '@okta/okta-signin-widget';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { environment } from 'environment';

import { routes } from 'app/app.routes';
import { LogInComponent } from 'app/components';
import { OktaService } from './okta.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly okta: IOktaAuth;
  private readonly tokensUrl: string;
  private readonly _isLoggedIn = new ReplaySubject<boolean>(1);

  get token(): Promise<string | null> {
    return new Promise(resolve => {
      this.okta.tokenManager.get('accessToken')
        .then(token => token?.value, () => null)
        .then(token => resolve(token));
    });
  }

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private ngZone: NgZone,
    private oktaService: OktaService,
    private router: Router
  ) {
    this.tokensUrl = `https://${environment.clientCode}.lusid.com/identity/api/tokens`;
    this.okta = oktaService.okta;
    this.getTokenFromSession()
      .then(token => this.storeToken(token), () => false)
      .catch(() => this.okta.tokenManager.get('accessToken'))
      .then(token => !!token, () => false)
      .then(isLoggedIn => this.setLoggedIn(isLoggedIn));
  }

  isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  logIn(): void {
    this.setLoggedIn(false);

    this.getTokenFromSession()
      .catch(() =>
        this.matDialog.open(LogInComponent).beforeClosed().toPromise()
      )
      .then(token => this.setLoggedIn(this.storeToken(token)));
  }

  logOut(): void {
    this.isLoggedIn()
      .pipe(take(1), filter(val => val !== false))
      .subscribe(() => {
        this.http.delete(this.tokensUrl).subscribe();
        this.okta.closeSession();
        this.setLoggedIn(false);
        this.router.navigate([routes.home]);
      });
  }

  private getTokenFromSession(): Promise<IOktaTokens> {
    return new Promise<void>((resolve, reject) =>
      this.ngZone.runOutsideAngular(() =>
        this.okta.session.exists().then(isLoggedIn => isLoggedIn ? resolve() : reject(), reject)
      )
    ).then(() => this.okta.token.getWithoutPrompt({ responseType: 'token' }));
  }

  private setLoggedIn(isLoggedIn: boolean): void {
    this._isLoggedIn.next(isLoggedIn);
  }

  private storeToken(tokens: IOktaTokens): boolean {
    const token = tokens?.tokens?.accessToken;
    if (!token) {
      return false;
    }
    this.ngZone.runOutsideAngular(() =>
      this.okta.tokenManager.add('accessToken', token)
    );
    return true;
  }

}
