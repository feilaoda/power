load('application');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

before(loadTask, {only: [ 'show']});

action(function index() {
    res.json({});
});


action(function show() {
    console.log(this.tasklist);
    res.json({task: this.task});
});


action(function create() {
    console.log(req.body);

    var projectId = new ObjectID(req.body.projectId);
    var tasklistId = new ObjectID(req.body.tasklistId);
    if(req.body.title == undefined){
        return res.json({stat:"error", error:"title is required"});
    }
    var data = {title: req.body.title, projectId:projectId, tasklistId:tasklistId};
    console.log(data);
    Task.create(data, function (err, task) {
        if (err) {
            res.json({stat:"error"});
        } else {
            res.json({stat:"ok"});            
        }
    });
});

// action(function create() {
//     //data['projectId'] = params.project_id;
//     console.log(req.body);
//     var projectId = req.body.projectId;
//     console.log(projectId);
//     Project.find(new ObjectID(projectId), function(err, project){
//         if(err || !project){
//             console.log(err);
//             res.json({stat:'error', error:"404"});
//         }
//         else{
//             console.log("create: "+ req.body);
//             var tasklist = {title: req.body.title};
//             project.tasklists.create(tasklist, function (err){
//                 res.json({stat:'ok'});
//             });

//         }
//     }.bind(this));
// });


function loadTask() {
    Task.find(params.id, function (err, data) {
        if (err || !data) {
            
        } else {
            console.log(data);
            this.task = data;
            next();
        }
    }.bind(this));
}

