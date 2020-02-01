router.get(
    "/tasks",
    function (request: Request, response: Response, next: NextFunction): void {
        let slack_data = request.query
        
//        console.log(slack_data);
        let todoistAgent = TodoistAgent.getTodoistAgent();
        todoistAgent.getAllTasks()
        .then((res : any) => 
        { 
            let fields = []
            let payload = {
                username: slack_data.user_name,
                
                attachments: [{
                    fallback: "This attachement isn't supported.",
                    title: "TODOLIST",
                    color: "#9C1A22",
                    pretext: "Todist tasks",
                    
                    fields: [{}],
                    
                    mrkdwn_in: ["text", "fields"],
                    text: "All tasks form channel "+slack_data.channel_name,
                    thumb_url: "https://i0.wp.com/cyberpunklibrarian.com/wp-content/uploads/2018/09/todoist-logo.png?ssl=1"
                }]
            };
            for (let task of res) {
                fields.push( 
                {"title": task.content,
                "value": task.url,
                "short": true})
                
            }
            payload.attachments[0].fields = fields.slice(0,4)
            response.json(payload)
            //response.json(res)
        }
        , (err:any)=> next(err))    
})
router.get(
    "/projects",
    // function (request: Request, response: Response, next: NextFunction): void {
    // response.json({
    //     "response_type": "in_channel",
    //     "text": "♜♞♝♚♛♝♞♜\n♟♟♟♟♟♟♟♟\n▓░▓░▓░▓░▓░▓░\n░▓░▓░▓░▓░▓░▓\n▓░▓░▓░▓░▓░▓░\n░▓░▓░▓░▓░▓░▓\n♙♙♙♙♙♙♙♙\n♖♘♗♔♕♗♘♖"
    // })