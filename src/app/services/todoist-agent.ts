import requestPromise = require("request-promise");

export class TodoistAgent
{
    private url :string;
    

    private static instance : TodoistAgent;

    private constructor ()
    {
        require('dotenv').config()
        this.url = process.env.TODOIST_URL;
        
    }

    
    public getAllTasks(token : any)
    {
        let options = {
            url : this.url+'/rest/v1/tasks',
            json : true,
            headers: {'Authorization' : `${token.token_type} ${token.access_token}`},
        }
        return requestPromise.get(options)
        
    }

    public getAllProjects(token : any)
    {
        let options = {
            method : 'GET',
            url : this.url+'/sync/v8/sync?'+
            'sync_token=*&resource_types=["projects"]',
            json : true,
            headers: {'Authorization' : `${token.token_type} ${token.access_token}`},
        }
        return requestPromise.get(options)

    }
    static getTodoistAgent()
    {
        if (!TodoistAgent.instance) TodoistAgent.instance = new TodoistAgent();
        return TodoistAgent.instance;
    }
}

