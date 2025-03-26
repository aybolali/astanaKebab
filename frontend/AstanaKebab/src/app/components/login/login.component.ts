import { Component, Inject, OnInit } from '@angular/core';
import myAppConfig from '../../config/my-app-config';

import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget'; //must by this order
import { OktaAuth } from '@okta/okta-auth-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  oktaSignin:any

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.jpg',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0], //taking part until /ouath2 - just dev-21036721.okta.com (base URL) - берет значение из myAppConfig.oidc.issuer и разрезает его по первому вхождению '/oauth2'. После этого берется первая часть строки (то есть всё, что находится до '/oauth2').
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      useClassicEngine:true,
      authParams : {
        pkce : true, //proof key for code exchange
        issuer : myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    })
  }



  ngOnInit(): void {
    this.oktaSignin.remove() //remove any previous elements for new renewed(updated) login page

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, //similar to div id 
      (response : any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect()
        }
      },
      (error : any) => {
        throw error
      }
    )

  }

}
