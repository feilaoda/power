load('application');

before(loadProject, {only: [ 'show', 'edit', 'update', 'destroy']});
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;


action('new', function () {
    this.title = 'New project';
    this.project = new Project;
    render();
});

action(function create() {
    console.log(req.body.Project);
    Project.create(req.body.Project, function (err, project) {
        if (err) {
            flash('error', 'Project can not be created');
            render('new', {
                project: project,
                title: 'New project'
            });
        } else {
            flash('info', 'Project created');
            redirect(path_to.projects());
        }
    });
});

action(function index() {
    this.title = 'Projects index';
    Project.all(function (err, projects) {
        render({
            token: req.csrfToken, 
            projects: projects
        });
    });
});

action(function show() {
    this.title = 'Project show';
    // console.log("show project" + this.project);
    //this.project.tasklists.forEach(function (tasklist){ console.log("show tasklist" + tasklist)});
    console.log(params);
    this.newTasklist = new TaskList;
    var projectId = new ObjectID(params.id);
    TaskList.all({where:{projectId: projectId}}, function(err, tasklists){
        console.log("tasklist: " + tasklists);
        render({tasklists:tasklists});  
    });
    
    // this.project.tasklists(function(err, tasklists){
        
    //     render({tasklists:tasklists}); 
    // });

    
});

action(function edit() {
    this.title = 'Project edit';

    render();
});

action(function update() {
    this.project.updateAttributes(body.Project, function (err) {
        if (!err) {
            flash('info', 'Project updated');
            redirect(path_to.project(this.project));
        } else {
            flash('error', 'Project can not be updated');
            this.title = 'Edit project details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.project.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy project');
        } else {
            flash('info', 'Project successfully removed');
        }
        send("'" + path_to.projects() + "'");
    });
});

function loadProject() {
    console.log(params);
    Project.find(new  ObjectID(params.id), function (err, data) {
        if (err || !data) {
            redirect(path_to.projects());
        } else {
            console.log(data);
            this.project = data;
            next();
        }
    }.bind(this));
}

function loadTasks() {

    Project.find(params.id, function (err, data) {
        if (err || !data) {
            redirect(path_to.projects());
        } else {
            this.project = data;
            next();
        }
    }.bind(this));

    //var tasklists = TaskList.all({where: {projectId: params.id}, order: 'id', limit: 100});

    
    // this.tasklists = this.project.tasklists.find();
    // TaskList.find({project_id: params.id}, function (err, data) {
    //     if (err || !data) {
    //         redirect(path_to.projects());
    //     } else {
            
    //         this.project.tasklists = data;
    //         console.log("tasklists " + this.project.tasklists);
    //         next();
    //     }
    // }.bind(this));

}
