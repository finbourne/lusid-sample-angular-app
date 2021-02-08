// This is minimal types deinition, actual structure is more complicated.

declare module '@okta/okta-signin-widget' {
  export default OktaSignIn;

  class OktaSignIn {
    constructor(config: IOkatSignInConfig);
    authClient: IOktaAuth;
    remove: () => void;
    renderEl: (
      options: { el: string | HTMLElement },
      onsuccess?: (res: IOktaTokens) => void
    ) => void;
  }

  export interface IOkatSignInConfig {
    baseUrl: string,
    clientId: string,
    language: string,
    redirectUri: string,
    features: {
      autoPush: boolean
    },
    authParams: {
      issuer: string,
      pkce: boolean,
      responseType: string,
      display?: string
    },
    idps? : {id: string, text: string}[],
    idpDisplay?: string
  }

  export type IOktaWidget = OktaSignIn;


  export interface IOktaAuth {
    session: {
      exists: () => Promise<boolean>
    };
    closeSession: () => Promise<void>;
    token: {
      getWithoutPrompt: (config: { responseType: string }) => Promise<IOktaTokens>
    };
    tokenManager: {
      add: (key: string, token: IOktaToken) => void,
      get: (key: string) => Promise<IOktaToken>
    };
  }

  export interface IOktaToken {
    value: string;
  }

  export interface IOktaTokens {
    tokens: {
      accessToken: IOktaToken
    };
  }
}
