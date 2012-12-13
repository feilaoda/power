load('application');

before(loadTask, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New task';
    this.task = new Task;
    render();
});

action(function create() {
    task = req.body.Task;
    task.projectId = params.project_id;
    task.tasklistId = req.body.tasklist_id
    console.log(task);
    Task.create(task, function (err, task) {
        if (err) {
            flash('error', 'Task can not be created');
            render('new', {
                task: task,
                title: 'New task'
            });
        } else {
            flash('info', 'Task created');
            redirect(path_to.project_tasklist(task.project(), task.tasklist()));
        }
    });
});

action(function index() {
    this.title = 'Tasks index';
    Task.all(function (err, tasks) {
        render({
            tasks: tasks
        });
    });
});

action(function show() {
    this.title = 'Task show';

    render();
});

action(function edit() {
    this.title = 'Task edit';
    console.log(this.tasklist);
    render();
});

action(function update() {
    this.task.updateAttributes(body.Task, function (err) {
        if (!err) {
            flash('info', 'Task updated');
            redirect(path_to.project_tasklist(this.task.project(), this.task.tasklist()));
        } else {
            flash('error', 'Task can not be updated');
            this.title = 'Edit task details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    var project = this.task.project();
    var tasklist = this.task.tasklist();
    this.task.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy task');
        } else {
            flash('info', 'Task successfully removed');
        }
        send("'" + path_to.project_tasklist(project, tasklist) + "'");
    });
});

function loadTask() {
    console.log(params);
    Task.find(params.id, function (err, task) {
        if (err || !task) {
            redirect(path_to.projects());
            next();
        } else {
            this.task = task;
            this.project = task.project();
            this.tasklist = task.tasklist();
            next();
        }
    }.bind(this));
}
