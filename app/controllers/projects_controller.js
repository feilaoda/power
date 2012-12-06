load('application');

before(loadProject, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New project';
    this.project = new Project;
    render();
});

action(function create() {
    console.log(req.body.Project);
    req.body.Project.created = Date.now();
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
    Project.find(function (err, projects) {
        render({
            projects: projects
        });
    });
});

action(function show() {
    this.title = 'Project show';
    render();
});

action(function edit() {
    this.title = 'Project edit';

    render();
});

action(function update() {
    this.project.update(body.Project, function (err) {
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
    this.project.remove(function (error) {
        if (error) {
            flash('error', 'Can not destroy project');
        } else {
            flash('info', 'Project successfully removed');
        }
        send("'" + path_to.projects() + "'");
    });
});

function loadProject() {
    Project.find({_id: params.id}, function (err, data) {
        if (err || !data || data.length == 0) {
            redirect(path_to.projects());
        } else {
            this.project = data[0];
            next();
        }
    }.bind(this));
}
