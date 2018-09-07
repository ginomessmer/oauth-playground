import { Component, Input } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  postEndpoint = '';
  postBearerToken = '';
  postJsonBody = '';
  postOutput: String;

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {
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
    this.postBearerToken = this.oauthService.getAccessToken();
    // prompt('Access Token', this.oauthService.getAccessToken());
  }

  getIdToken() {
    this.postBearerToken = this.oauthService.getIdToken();
    // prompt('ID Token', this.oauthService.getIdToken());
  }

  sendPost() {
    this.httpClient.post(this.postEndpoint, this.postJsonBody).subscribe(data => {
      this.postOutput = data.toString();
    });
  }

  clearBearerToken() {
    this.postBearerToken = '';
  }

  public get accessToken() {
    return this.oauthService.getAccessToken();
  }

  public get idToken() {
    return this.oauthService.getIdToken();
  }
}
