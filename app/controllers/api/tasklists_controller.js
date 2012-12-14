load('application');
before(loadTaskList, {only: [ 'show']});


action(function index() {
    var project_id = req.query.project_id;
    console.log(req.query);
    TaskList.all({where: {projectId:project_id}}, function (err, tasklists) {
        res.json(tasklists);
    });
});

action(function show() {
    console.log(this.tasklist);
    var tl = this.tasklist;
    var pid = this.tasklist.project();
    this.tasklist.tasks(function(err, tasks){
        res.json({projectId: pid,
            tasklist: tl,  
            token: req.csrfToken,
            tasks: tasks});
    });
});


action(function create() {
    //data['projectId'] = params.project_id;
    console.log(req.body);
    Project.find(req.body.project_id, function(err, project){
        if(err || !project){
            console.log(err);
        }
        else{
            console.log("create: "+ req.body);
            var tasklist = {title: req.body.title};
            project.tasklists.create(tasklist, function (err){
                res.json({stat:'ok'});
            });

        }
    });
});


function loadTaskList() {
    TaskList.find(params.id, function (err, data) {
        if (err || !data) {
            res.json({stat:'error', error:err})
        } else {
            console.log(data);
            this.tasklist = data;
            next();
        }
    }.bind(this));
}