import { GenericAuthenticator } from "../src/app/services/generic-authenticator";
//import axios from 'axios';
import {Request} from 'express';

import rp = require('request-promise');


jest.mock('request-promise');
const mockedRP = rp as jest.Mocked<typeof rp>;
afterEach(() => {
  mockedRP.post.mockClear();
});

describe('get signin url', () => {
    it('should return a valid sigin url', () => {
        
       
      let result = new GenericAuthenticator().getSigninUrl(
          'ID', 
          'STATE',
          'SCOPE',
          'URL'
      );
      expect(result).toBe(`URL/oauth/authorize?client_id=ID&scope=SCOPE&state=STATE&response_type=code`);  
      
      }) 
  });

  describe('get signin url', () => {
    it('should return a string', () => {
      let result = new GenericAuthenticator().getSigninUrl(
          'ID', 
          'STATE',
          'SCOPE',
          'URL'
      );
      expect(typeof result).toBe('string');  
      
      }) 
  });

  describe('get token with valid code', () => {
    it('should return a token ', () => {
        
      const mockRequest : any  = {
          query: {code : 'valid code'}
      } as Request;
        
      const mockResponse = {"token_type":"Bearer"};
      mockedRP.post.mockResolvedValue(mockResponse);
      new GenericAuthenticator().getToken(
          mockRequest,
          'ID', 
          'SECRET',
          'REDIRECT_URL',
          'URL'
      ).then(result =>  expect(result).toEqual({token_type: "Bearer" }))
    }) 
  });
  describe('get token with invalid code', () => {
    it('should return error', () => {      
      const mockRequest : any  = {} as Request; // NO CODE
      mockedRP.post.mockRejectedValue(
        {
          statusCode: 400,
          error: {error :"invalid_grant"},
        }
      );
      new GenericAuthenticator().getToken(
          mockRequest,
          'ID', 
          'SECRET',
          'REDIRECT_URL',
          'URL'
      ).catch(e =>
        expect(e).toEqual({
          error: {error :"invalid_grant"},
          statusCode :400
        }))
    })   
  });
  