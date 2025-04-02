import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit{

  isAuthenticated : boolean = false 
  userFullName : string = ''

  storage: Storage = sessionStorage
  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ){}

  ngOnInit(): void { //when I do (log in or log out) based on the auth state for this component
    //auth states changes
    //  The authState$ observable from OktaAuthStateService is automatically set up to monitor changes in the authentication state, such as when a user logs in or out.
    // authState$ automatically emits updates on the user's authentication state. When a user logs in, Okta triggers a state change, which causes authState$ to emit a new value.
    this.oktaAuthService.authState$.subscribe( 
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )
  }
  getUserDetails() {
    //user name exposed
    if(this.isAuthenticated){
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string 

          //retrieve the user's email from the authentication response
          const theEmail = res.email;

          //storing the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail))
        }
      )
    }
  }

  logout(){
    this.oktaAuth.signOut()
  }

}
