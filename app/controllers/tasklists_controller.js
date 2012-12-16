load('application');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

before(loadTaskList, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New tasklist';
    this.tasklist = new TaskList;
    render();
});

action(function create() {
    // var title = req.body.TaskList.title;
    // var data = {project_id: project_id, title: title, created: Date.now()};
    var data = req.body.TaskList;
    //data['projectId'] = params.project_id;
    console.log(req.body.TaskList);
    Project.find(new ObjectID(params.project_id), function(err, project){
        if(err || !project){
        }
        else{
            console.log("2 create"+ req.body.TaskList);
            project.tasklists.create(req.body.TaskList, function (err){});
            flash('info', 'TaskList created');
            redirect(path_to.project(project));
        }
    });
    
    // console.log(data);
    // var tasklist = new TaskList;

    // TaskList.create(data, function (err, tasklist) {
    //     if (err) {
    //         flash('error', 'TaskList can not be created');
    //         render('new', {
    //             tasklist: tasklist,
    //             title: 'New tasklist'
    //         });
    //     } else {

    //         flash('info', 'TaskList created');
    //         redirect(path_to.tasklists());
    //     }
    // });
});

action(function index() {
    this.title = 'TaskLists index';
    var project_id = req.body.project_id;
    console.log(req.body);
    TaskList.all(function (err, tasklists) {
        res.json(tasklists);
    });
});

action(function show() {
    this.title = 'TaskList show';
    // TaskList.find(params.id, function (err, data) {
    //     if (err || !data) {
    //         redirect(path_to.tasklists());
    //     } else {
    //         this.tasklist = data;
    //         console.log(data);
            
    //         this.project = this.tasklist.project();
    //         console.log(this.project);
    //         //this.tasks = this.tasklist.tasks();
    //         render();
    //     }
    // }.bind(this));
    
    Task.all({where: {tasklistId: params.id}}, function(err, tasks){
        var     newTask = new Task;
        render({newTask: newTask, tasks:tasks}); 
    });

    // this.tasklist.tasks(function(err, tasks){
    //     task = new Task;
    //     render({newTask: task, tasks:tasks}); 
    // })

});

action(function edit() {
    this.title = 'TaskList edit';
    // render();
    
     TaskList.find(params.id, function (err, data) {
        if (err || !data) {
            redirect(path_to.tasklists());
        } else {
            this.tasklist = data;
            console.log(data);
            console.log(this.tasklist.project());
            this.project = this.tasklist.project();
            render();
        }
    }.bind(this));
});

action(function update() {
    this.tasklist.updateAttributes(body.TaskList, function (err) {
        if (!err) {
            flash('info', 'TaskList updated');
            redirect(path_to.project(this.tasklist.project()));
        } else {
            flash('error', 'TaskList can not be updated');
            this.title = 'Edit tasklist details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    var project = this.project;
    console.log(project);
    this.tasklist.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy tasklist');
        } else {
            flash('info', 'TaskList successfully removed');
        }
        send("'" + path_to.project(project) + "'");
    });
});

function loadTaskList() {
    console.log(params);
   

    TaskList.find(new ObjectID(params.id), function (err, data) {
        if (err || !data) {
            redirect(path_to.tasklists());
        } else {
            this.tasklist = data;
            console.log(data);
            console.log(this.tasklist.project());
            this.project = this.tasklist.project();
            next();
        }
    }.bind(this));

    

}

function loadTaskLists() {
    console.log(params);
    // Project.find(params.project_id, function (err, project) {
    //             if (err || !project) {
    //                 redirect(path_to.projects());
    //             } else {
    //                 this.project = project;
    //                 next();
    //             }
    // }.bind(this));

    TaskList.find(params.id, function (err, data) {
        if (err || !data) {
            redirect(path_to.tasklists());
        } else {
            this.tasklist = data;
            this.project = this.tasklist.project();
            next();
        }
    }.bind(this));

    

}
