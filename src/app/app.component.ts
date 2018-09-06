import { Component, Input } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() clientId = localStorage.getItem('clientId');
  @Input() issuer = localStorage.getItem('issuer');
  @Input() redirectUri = localStorage.getItem('redirectUri');
  @Input() scope = localStorage.getItem('scope');

  constructor(private oauthService: OAuthService) {
    console.log(oauthService.getAccessToken());
  }

  private configureOAuth() {
    this.saveConfigToLocalStorage();

    this.oauthService.configure({
      issuer: this.issuer,
      clientId: this.clientId,
      redirectUri: this.redirectUri,
      scope: this.scope,

      strictDiscoveryDocumentValidation: false,
    });

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oauthService.initImplicitFlow();
    })
  }

  private signOut() {
    this.oauthService.logOut();
    
  }

  saveConfigToLocalStorage(): any {
    localStorage.setItem('clientId', this.clientId);
    localStorage.setItem('issuer', this.issuer);
    localStorage.setItem('redirectUri', this.redirectUri);
    localStorage.setItem('scope', this.scope);
  }

  getAccessToken() {
    prompt('Access Token', this.oauthService.getAccessToken());
  }

  getIdToken() {
    prompt('ID Token', this.oauthService.getIdToken());
  }

  public get accessToken() {
    return this.oauthService.getAccessToken();
  }

  public get idToken() {
    return this.oauthService.getIdToken();
  }
}
