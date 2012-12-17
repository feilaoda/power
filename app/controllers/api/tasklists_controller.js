load('application');
before(loadTaskList, {only: [ 'show']});
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

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
        res.json({project:{id: pid },
            tasklist: tl,  
            tasks: tasks});
    });
});


action(function create() {
    //data['projectId'] = params.project_id;
    console.log(req.body);
    if(req.body.title == undefined){
        return res.json({stat:"error", error:"title is required"});
    }

    var projectId = req.body.projectId;
    console.log(projectId);
    Project.find(new ObjectID(projectId), function(err, project){
        if(err || !project){
            console.log(err);
            res.json({stat:'error', error:"404"});
        }
        else{
            console.log("create: "+ req.body);
            var tasklist = {title: req.body.title};
            project.tasklists.create(tasklist, function (err){
                res.json({stat:'ok'});
            });

        }
    }.bind(this));
});


function loadTaskList() {
    TaskList.find(new ObjectID(params.id), function (err, data) {
        if (err || !data) {
            res.json({stat:'error', error:err})
        } else {
            console.log(data);
            this.tasklist = data;
            next();
        }
    }.bind(this));
}