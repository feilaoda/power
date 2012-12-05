require('../test_helper.js').controller('projects', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        created: '',
        permission: ''
    };
}

exports['projects controller'] = {

    'GET new': function (test) {
        test.get('/projects/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/projects', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Project.find;
        Project.find = sinon.spy(function (id, callback) {
            callback(null, new Project);
        });
        test.get('/projects/42/edit', function () {
            test.ok(Project.find.calledWith('42'));
            Project.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Project.find;
        Project.find = sinon.spy(function (id, callback) {
            callback(null, new Project);
        });
        test.get('/projects/42', function (req, res) {
            test.ok(Project.find.calledWith('42'));
            Project.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var project = new ValidAttributes;
        var create = Project.create;
        Project.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, project);
            callback(null, project);
        });
        test.post('/projects', {Project: project}, function () {
            test.redirect('/projects');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var project = new ValidAttributes;
        var create = Project.create;
        Project.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, project);
            callback(new Error, project);
        });
        test.post('/projects', {Project: project}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Project.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/projects/1', new ValidAttributes, function () {
            test.redirect('/projects/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Project.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/projects/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

