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





customSchema(function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    var Project = new Schema({
        name     : String
        , description      : String
        , permission : String
        , created      : Date
    });

    var project = mongoose.model('Project', Project);
    project.modelName = 'Project'; // this is for some features inside railway (helpers, etc)
    module.exports['Project'] = project;


    var User = new Schema({
        username     : String
        , password      : String
        , email : String
        , created      : Date
    });

    var user = mongoose.model('User', User);
    user.modelName = 'User'; // this is for some features inside railway (helpers, etc)
    module.exports['User'] = user;


});



var Task = describe('Task', function () {
    property('title', String);
    property('project', "project");
    property('user', String);
    property('finishTime', Date);
    property('created', Date);
});
 