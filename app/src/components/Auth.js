import React, {Component} from "react";
import auth0 from "auth0-js";
import axios from 'axios';

import {AUTH_CONFIG} from "../auth0-variables";
import {AuthProvider} from "../authContext";

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: AUTH_CONFIG.apiUrl,
  responseType: 'token id_token',
  scope: 'openid profile read:customers read:employees'
});

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      permissions: []
    },
    accessToken: ""
  };

  initiateLogin = () => {
    auth.authorize({
      prompt: "login"
    });
  };

  logout = (error) => {
    
    let qs = '';
    //If time allows, look into the error object being returned on logout.
    if (error && error != '[object Object]') {
      qs = '?error=' + encodeURI(error);
      auth.logout({
        returnTo: 'http://localhost:3000' + qs,
        clientID: AUTH_CONFIG.clientId,
      });
    }
    this.setState({
      authenticated: false,
      user: {
        permissions: []
      },
      accessToken: ""
    });
  };

  handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} occured`);
        this.logout(error.errorDescription);
        return;
      }
      this.setSession(authResult);
    });
  };

  setSession(data) {
    //console.log(data);
    axios.get('http://localhost:3001/permissions', { headers: { 'Authorization': `Bearer ${data.accessToken}`}})
      .then(response => {
        const user = {
          id: data.idTokenPayload.sub,
          name: data.idTokenPayload.name,
          nickname: data.idTokenPayload.nickname,
          permissions: response.data
        };
        this.setState({
          authenticated: true,
          accessToken: data.accessToken,
          user
        });
        console.log(this.state.accessToken);
      })
      .catch(error => console.log(error));
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;