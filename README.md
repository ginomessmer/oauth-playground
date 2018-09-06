# OAuth 2 Playground

##### A simple client for testing out various implicit flow scenarios

---

### Dependencies:

- Angular
- Bootstrap 4
- Angular OAuth 2 OIDC



## Build and run

- Get the latest Angular CLI `npm install -g @angular/cli`
- Install all dependencies `npm install`
- Run it `ng serve`
- Navigate to `localhost:4200` with your preferred browser



## Get started

- Retrieve the client ID and the issuer URL from the API endpoint you would like to use
- Make sure to set the redirect URL to `http://localhost:4200` (or any other valid URL if you use on a different endpoint)
- Pass along various scopes (`openid` should work in most cases, but feel free to add any other supported scopes)