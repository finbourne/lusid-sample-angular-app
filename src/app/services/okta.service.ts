import { Injectable, NgZone } from '@angular/core';
import OktaSignIn, { IOkatSignInConfig, IOktaAuth, IOktaWidget } from '@okta/okta-signin-widget';

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

    const config : IOkatSignInConfig = {
      baseUrl: link.origin,
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
    };

    if (environment.okta.samlIdentityProviderId) {
      config.idps = [
        { text: 'Use your company credentials.', id: environment.okta.samlIdentityProviderId }
      ];
      config.idpDisplay = 'PRIMARY';
      config.authParams.display = 'popup';
    }

    this.widget = ngZone.runOutsideAngular(() => new OktaSignIn(config));
    this.okta = this.widget.authClient;
  }
}
