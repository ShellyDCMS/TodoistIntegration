
import express = require( "express" );
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { TodoistAgent } from "../services/todoist-agent";

const router = express.Router()

router.get(
    "/tasks",
    function (request: Request, response: Response, next: NextFunction): void {
        //let slack_data = request.query
        
        let todoistAgent = TodoistAgent.getTodoistAgent();
        todoistAgent.getAllTasks(request.session.auth.token)
        .then((res : any) => 
        { 
            response.json(res)
        }
        , (err:any)=> next(err))    
})

export default router;