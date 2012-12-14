load('application');

before(loadTask, {only: [ 'show']});

action(function index() {
    res.json({});
});


action(function show() {
    console.log(this.tasklist);
    res.json({task: this.task});
});


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

