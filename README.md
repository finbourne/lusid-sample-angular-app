# Lusid Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

## Environment details

Make a file `src/environment/environment.ts` based on contents of file `src/environment/environment.example.ts` and fill in details:
|Placeholder|Meaning|
|---|---|
|`{{CLIENT_CODE}}`|LUSID client code, e.g.: `myco` from (https://__*myco*__.lusid.com)|
|`{{OKTA_CLIENT_ID}}`|OKTA client ID: https://developer.okta.com/docs/guides/find-your-app-credentials/overview/|
|`{{OKTA_ISSUER}}`|The full URL for a the OKTA issuer, available from  `GET https://{CLIENT_CODE}/identity/api/authentication/information` => __issuerUrl__ (this should always be populated)|
|`{{OKTA_SAML_IDENTITY_PROVIDER_ID}}`|The identifier of an external SAML system, available from  `GET https://{CLIENT_CODE}/identity/api/authentication/information` => __samlIdentityProviderId__ (this can be empty)|

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost.lusid.com`. The app will automatically reload if you change any of the source files.

You need to configure your local host to use `localhost.lusid.com`.

This is a simple demo application for local use. It hasn't been reviewed for security issues.
