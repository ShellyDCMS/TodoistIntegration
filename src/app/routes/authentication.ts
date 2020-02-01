import express = require("express");
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { TodoistAuthenticator } from "../services/todoist-authenticator";


const router = express.Router()

router.get(
    "/signin",
    function (request: Request, response: Response, next: NextFunction): void {
        let state = request.query? request.query.channel_name : "dummy"
        let authenticator = new TodoistAuthenticator()
        response.redirect(
            authenticator.getSigninUrl(
                process.env.APPLICATION_ID,
                state)
        )               
    }
)

router.get(
    '/redirect', 
    // The req.query object has the query params that
    // were sent to this route. We want the `code` param
    function (req: Request, res: Response, next: NextFunction): void {        
        new TodoistAuthenticator().getToken(
            req, 
            process.env.APPLICATION_ID,
            process.env.APPLICATION_SECRET,
            process.env.SERVER+'/oauth/redirect')                    
        .then((response) => {
            // Once we get the response, extract the access token from
            // the response body
            const accessToken = JSON.parse(response)
            console.log(accessToken)
            return res.redirect(`/oauth/session?access_token=${JSON.stringify(accessToken)}`)
    }).catch(err =>
            {
                console.log(err)
            })    
        , (err:any)=> next(err) 
                    
    })

    router.get('/session', function(req, res) {
        req.session.auth= {token : JSON.parse(req.query.access_token)}
        res.redirect(process.env.SERVER +'/todoist/tasks')
    });


export default router;
