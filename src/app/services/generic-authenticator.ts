
import rp = require('request-promise');

import { Request } from "express";
import {Authenticator} from '../interfaces/authenticator'

export class GenericAuthenticator implements Authenticator{

 getSigninUrl(
    applicationID : string,     
    state :string,
    scope: string, 
    oauthProviderUrl : string, 
    )
 {
    
     return `${oauthProviderUrl}/oauth/authorize` +
            `?client_id=${applicationID}` + 
            `&scope=${scope}` + 
            `&state=${state}` +
            '&response_type=code';
 }
    
    
getToken(
    req : Request,
    applicationID : string,     
    applicationSecret : string, 
    redirectUri :string,
    oauthProviderUrl : string,  
    )
{
    let code : string = req.query? (req.query.code) : undefined
    return rp.post(
        oauthProviderUrl + `/oauth/access_token`, 
        {
            qs : {
                client_id : applicationID,
                client_secret : applicationSecret,
                code : code,
                grant_type : 'authorization_code', 
                redirect_uri : redirectUri
            },
            headers: {
            accept: 'application/json',
            json : true
            }
        })
    }
}