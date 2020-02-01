import rp = require('request-promise');
import { Request } from "express";
//import {AxiosResponse} from 'axios'

export interface Authenticator {

  getSigninUrl : (
    applicationID : string,     // As recieved when registered at Oauth provide app
    state :string,              // Payload which will be recieved ate the redirect
                                // address, if the authentication is successfull.
    scope: string,              // A list of permissions that you would like 
                                // the users to grant to your application   
    oauthProviderUrl : string,  // i.e. https://api.todoist.com                             
    ) => string;

  getToken : (
    req : Request,              // As recieved at the redirect url 
                                // (req.query must contain code and state)    
    applicationID : string,     // As recieved when registered at Oauth provide app
    applicationSecret : string, // As recieved when registered at Oauth provide app  
    redirectUri :string,        // Must be identical to the url provided to Auth Provider App
                                // at registration, i.e. https://myapp.com/oauth/redirect
    oauthProviderUrl : string,  // i.e. https://api.todoist.com
    ) => rp.RequestPromise;
   
  }