export default {
    //OpenIDConnect
    oidc : {
        clientId: '0oalph6c8dOEJDLvC5d7',
        issuer: 'https://dev-21036721.okta.com/oauth2/default', //MUST USE HTTPS
        redirectUri: 'https://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'] //info about user  -- openid not openId
    }
}
