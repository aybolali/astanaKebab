export default {
    //OpenIDConnect
    oidc : {
        clientId: '*',
        issuer: '*', //MUST USE HTTPS
        redirectUri: 'https://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'] //info about user  -- openid not openId
    }
}
