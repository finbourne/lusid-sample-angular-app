import { Injectable, NgZone } from '@angular/core';
import OktaSignIn, { IOktaAuth, IOktaWidget } from '@okta/okta-signin-widget';

import { environment } from 'environment';

@Injectable({ providedIn: 'root' })
export class OktaService {

  readonly okta: IOktaAuth;
  readonly widget: IOktaWidget;
  constructor(
    ngZone: NgZone
  ) {
    const link = document.createElement('a');
    link.href = environment.okta.issuer;
    const baseUrl = link.origin;
    this.widget = ngZone.runOutsideAngular(() => new OktaSignIn({
      baseUrl,
      clientId: environment.okta.clientId,
      language: 'en',
      redirectUri: window.location.origin,
      features: {
        autoPush: true
      },
      authParams: {
        issuer: environment.okta.issuer,
        pkce: false,
        responseType: 'token'
      }
    }));
    this.okta = this.widget.authClient;
  }
}
