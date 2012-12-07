load('application');

before(loadTask, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New task';
    this.task = new Task;
    render();
});

action(function create() {
   
    Task.create({}, function (err, task) {
        if (err) {
            flash('error', 'Task can not be created');
            render('new', {
                task: task,
                title: 'New task'
            });
        } else {
            flash('info', 'Task created');
            redirect(path_to.tasks());
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
    render();
});

action(function update() {
    this.task.updateAttributes(body.Task, function (err) {
        if (!err) {
            flash('info', 'Task updated');
            redirect(path_to.task(this.task));
        } else {
            flash('error', 'Task can not be updated');
            this.title = 'Edit task details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.task.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy task');
        } else {
            flash('info', 'Task successfully removed');
        }
        send("'" + path_to.tasks() + "'");
    });
});

function loadTask() {
    Task.find(params.id, function (err, task) {
        if (err || !task) {
            redirect(path_to.tasks());
        } else {
            this.task = task;
            next();
        }
    }.bind(this));
}
