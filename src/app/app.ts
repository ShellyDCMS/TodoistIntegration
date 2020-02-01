import express = require( "express" );
import cors = require('cors')
import helmet = require('helmet')

import { Application } from "express";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

import bodyParser = require( "body-parser" );
import path = require('path');

import todoist_router from './routes/todoist'
import authentication_router from './routes/authentication'
import { configure, getLogger } from 'log4js';

import * as session from 'express-session'

require('dotenv').config();

configure({
    appenders: { 
        serverlog: {
            type: 'file',
            filename: 'logs/server.log',
            maxLogSize: 10 * 1024 * 1024, // 10Mb
            numBackups: 10,
            compress: true
        },   
        console: { type: "console" }
    },
    categories: {
        default: { appenders: ["console", "serverlog"], level: "error" } 
    }
});
const logger = getLogger();
logger.level = "debug";

class App {

  public express: Application

  constructor () {
    
    
    this.express = express()
    
  
      
    this.express.use(bodyParser.urlencoded({
        extended: false
    }));

    

    let corsOptions = 
    {
        origin : (requestOrigin: string, callback: (err: Error | null, allow?: boolean) => void) =>
        {
            let whiteList=['http://localhost']
            for (let origin of whiteList)
            {
                if (!requestOrigin || requestOrigin.startsWith(origin))
                {
                    callback(null, true)
                    return
                }
            }               
            callback(new Error('Origin not allowed'))
            
        }
    }
            
      
    this.express.use(helmet())
    this.express.use(bodyParser.json());
    this.express.use(cors(corsOptions))
    
    this.express.use(session(
    {              
        secret: process.env.APPLICATION_SECRET,
        resave: true,
        saveUninitialized: true,
        //cookie : {httpOnly: true}

        // store: new FileStore(),   
        //  resave: false,
        //  saveUninitialized: true
    }
    )) 
      
      
      
    //this.express.use(isUserAuthenticated)
    this.express.use(express.static(path.join(__dirname,'dist')))
    this.express.use(express.static(path.join(__dirname,'assets')))
    this.express.use(express.static(path.join(__dirname,'images')))
    //this.express.use(cors({origin:'*',}))
    this.express.use(
        function (error: any, request: Request, response: Response, next: NextFunction): void {
    
            response
                .status(500)
                .type("text/plain")
                .send("Something went wrong: " + error);
    
        }
    )

    // IMPL
   
    this.express.use('/oauth', authentication_router)
    this.express.use('/todoist', /*[isUserAuthenticated(false)],*/ todoist_router)
    

  }
  
}

export default new App().express;
