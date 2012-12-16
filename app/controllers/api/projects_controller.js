load('application');
before(loadProjectTasks, {only: [ 'shows']});

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;


action(function index() {
    Project.all(function (err, projects) {
        res.json(projects);
    });
});



var Step = require('step');


function loadProject(id, callback){
    Project.find(new ObjectID(id), function(err, data){
        callback(err, data);
    });
}


function loadTaskLists(projectId, callback){
    var tasklists;
    var tasks;
    Step(
        function loadTaskList(){
            TaskList.all({where: {projectId: projectId}}, this);


        },

        function loadTasks(err, data){
            if(err) throw err;
            tasklists = data;
            var parallel = this.parallel;
            data.forEach(function(tasklist){
                tasklist.tasks(parallel());
            });
        },

        function parseTasks(err, tasks){
            var ts = {};
            console.log(tasks);
        }
    

    );
}

action(function show() {
    this.title = 'Project show';
    
    // TaskList.all({where:{projectId:params.id}}, function(err, tasklists){
    //     console.log(typeof(tasklists));
    //     console.log(tasklists);
    //     var list = [];
    //     tasklists.forEach(function(tasklist){
    //         tasklist.tasks(function(err, tasks){
    //             if(tasks.length>0){
    //                 console.log(tasks);
    //                 tasklist.tasks = tasks;
    //             }
    //             list.push(tasklist);
    //         });
    //     });
       

    // });
    


    
    var projectId = params.id;
    var projectObjectId = new ObjectID(projectId);
    var tasklists = {};
    Step(

        function loadTaskList(){
            TaskList.all({where: {projectId: projectObjectId }}, this);
        },

        function loadTasks(err, data){
            if(err) throw err;
            
            // tasklists = data;
            console.log("tasklist count is: " + data.length);
            data.forEach(function(tasklist){
                tasklists[tasklist.id] = tasklist.to_dict(); // {id: tasklist.id, title: tasklist.title};
            });
            var parallel = this.parallel;
            data.forEach(function(tasklist){
                tasklist.tasks(parallel());
            });
        },

        function parseTasks(err){
            // console.log(Array.prototype.slice.call(arguments,1));
            var tasks = [];
            Array.prototype.slice.call(arguments,1).forEach(function (data) {

                if (data != undefined && data.length > 0){
                    var tasklistId = data[0].tasklistId;
                    if (tasklistId != undefined){
                        var tls = tasklists[tasklistId];
                        if (tls != undefined){
                            tls['tasks'] = data;
                        }
                    }

                    // data.forEach(function(task){
                    //     var tasklistid = task.tasklistId;
                    //     console.log(tasklists[tasklistid]);

                    //     if (tasklistid != undefined){
                    //         if (tasklists[tasklistid].tasks === undefined){
                    //             tasklists[tasklistid].tasks = [];
                    //         }
                    //         else{
                    //             tasklists[tasklistid].tasks.push(task);
                    //         }
                    //     }
                    // });
                }
              });

            // return tasks;
            console.log(tasklists);
            res.json({project: {id: projectId},tasklists: tasklists});
        },

        function finalize(err){
            console.log("finalize");
            // console.log(tasks);

            //res.json({tasklists: tasklists, tasks: tasks});
        }
    


        // function thefunc1(){
        //     //console.log("func1");
        //     // TaskList.all({where: {projectId: projectId}}, this);
        //     loadTaskList(projectId, this);
        // },
        // function thefunc2(err, tasklists){
        //     console.log("2");
        //     console.log(tasklists);

        //     return tasklists;
        // },
        // function thefunc3(err, tasklists){
        //     //console.log(finishFlag);
        //     res.json({project: {id: projectId},  
        //         tasklists: tasklists, test:'ok'});
        // }
        // function finalize(err){

        // }

        // function fun1(){
        //     Project.find(params.id, function (err, data) {
        //         if (err || !data) {
        //             res.json({stat:'error', error:err})
        //         } else {
        //             console.log(data);
        //             this.project = data;
        //             next();
        //         }
        //     }.bind(this));
        // },

        // function fun2(){
        //     console.log('func2');
        // },

        // function fun3(){
        //     console.log('func3');
        // },
    );

    

});

function loadProjectTasks() {
    Project.find(params.id, function (err, data) {
        if (err || !data) {
            res.json({stat:'error', error:err})
        } else {
            console.log(data);
            this.project = data;
            this.project.tasklists(function(err, tasklists){
                var list = [];
                tasklists.forEach(function(tasklist){
                    tasklist.tasks(function(err, tasks){
                        if(tasks.length>0){
                            console.log(tasks);
                            tasklist.tasks = tasks;
                        }
                        list.push(tasklist);
                        this.tasklists = tasklists;
                        next();
                    });
                });
            });
        }
    }.bind(this));

    // TaskList.all({where:{projectId:params.id}}, function(err, tasklists){
    //     var list = [];

    //     tasklists.forEach(function(tasklist){
    //         tasklist.tasks(function(err, tasks){
    //             if(tasks.length>0){
    //                 console.log(tasks);
    //                 tasklist.tasks = tasks;
    //             }
    //             list.push(tasklist);
    //             this.tasklists = tasklists;
    //             next();
    //         });
    //     });
        

    //     next();
    // });
}

function loadProjectxx() {
    Project.find(params.id, function (err, data) {
        if (err || !data) {
            res.json({stat:'error', error:err})
        } else {
            console.log(data);
            this.project = data;
            next();
        }
    }.bind(this));
}

