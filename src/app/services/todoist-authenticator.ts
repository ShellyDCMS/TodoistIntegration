

import { Request } from "express";
import {GenericAuthenticator} from './generic-authenticator'
import {Authenticator} from '../interfaces/authenticator'


const oauthProviderUrl = 'https://api.todoist.com'
const scope = 'data:read,task:add'

export class TodoistAuthenticator  implements Authenticator{
        
    getSigninUrl(applicationID : string, state :string)
    {
        return new GenericAuthenticator().getSigninUrl(            
            applicationID, 
            state,
            scope,
            oauthProviderUrl, )
    }
        
    getToken(    
        req : Request,
        applicationID : string,     
        applicationSecret : string, 
        redirectUri :string, )
    {
        return new GenericAuthenticator().getToken(
            req, 
            applicationID, 
            applicationSecret, 
            redirectUri, 
            oauthProviderUrl
        )
    
    }
}