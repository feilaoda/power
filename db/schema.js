/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

// customSchema(function () {

//     var mongoose = require('mongoose');
//     mongoose.connect('mongodb://localhost/test');

//     var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;



//     // var User = new Schema({
//     //     username     : String
//     //     , password      : String
//     //     , email : String
//     //     , created      : Date
//     // });

//     // var user = mongoose.model('User', User);
//     // user.modelName = 'User'; // this is for some features inside railway (helpers, etc)
//     // module.exports['User'] = user;




//     var TaskList = new Schema({
//         title     : String
//         , user      : String
//         , created      : Date
//         , project_id : { type: Schema.Types.ObjectId, ref: 'Project' },
//     });

//     var tasklist = mongoose.model('TaskList', TaskList);
//     tasklist.modelName = 'TaskList'; // this is for some features inside railway (helpers, etc)
//     module.exports['TaskList'] = tasklist;



//     var Project = new Schema({
//         name     : String
//         , description      : String
//         , permission : String
//         , tasklists : [{ type: Schema.Types.ObjectId, ref: 'TaskList' }]
//         //, user : User
//         , created      : Date
//     });

//     var project = mongoose.model('Project', Project);
//     project.modelName = 'Project'; // this is for some features inside railway (helpers, etc)
//     module.exports['Project'] = project;



// });



// var Demo = define('demo', function () {    
// });




var dburl = 'mongodb://localhost:27017/power';
schema('mongodb', { url: dburl }, function(){
        define('User', function(){
            property('username',{type: String, index: true});
            property('email',{type: String, index: true});
            property('password',{type: String});
            
            property('createTime',{type:String, default:Date.now});
        });


        define('Task', function(){
            property('title',{type: String, index:true});
            property('createTime',{type:Date, default:Date.now});
            property('finishTime',{type: String});
            property('done',{type: Boolean, default: false, index: true });
        });

        var TaskList = define('TaskList', function(){
            property('title',{type: String});            
            
            property('createTime',{type:String, default:Date.now});
        });


        var Project = define('Project', function(){
            property('name',{type: String, index:true});            
            property('description',{type: String});
            property('permission',{type: String});
            property('createTime',{type:String, default:Date.now});
        });

        Project.hasMany(TaskList, {as: 'tasklists', foreignKey: 'projectId'});
        TaskList.belongsTo(Project, {as: 'project', foreignKey: 'projectId'});


    });

// var Schema = require('jugglingdb').Schema;
// var schema = new Schema('mongodb', { url: 'mongodb://localhost:27017/power' }); //port number depends on your configuration
// // define models
// var Task = schema.define('Task', function(){
//     // title:     { type: String},
//     // createdAt:      { type: Date,    default: Date.now },
//     // finishedAt:      { type: Date,    default: Date.now },
//     // done: { type: Boolean, default: false, index: true }

//     property('title',{type: String, index:true});
//     property('createdAt',{type:String, default:Date.now});
// property('finishedAt',{type: String});
// property('done',{type: Boolean, default: false, index: true });


// });



// var User = schema.define('User', {
//     name:         { type: String, index: true },
//     password:     String,
//     createdAt:   Date,
//     email:     { type: String, index: true }
// });

// User.hasMany(Task, {as: 'tasks', foreignKey: 'userId'})
// // Task.belongsTo(User, {as: 'user', foreignKey: 'userId'})


// module.exports['Task'] = Task;
// // schema.automigrate(function (err) {
// //             if (err) {
// //                 console.log('Error while migrating');
// //                 console.log(err);
// //             } else {
                
// //             }
// //         });

