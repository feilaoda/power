require('../test_helper.js').controller('tasklists', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        user: '',
        created: ''
    };
}

exports['tasklists controller'] = {

    'GET new': function (test) {
        test.get('/tasklists/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/tasklists', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = TaskList.find;
        TaskList.find = sinon.spy(function (id, callback) {
            callback(null, new TaskList);
        });
        test.get('/tasklists/42/edit', function () {
            test.ok(TaskList.find.calledWith('42'));
            TaskList.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = TaskList.find;
        TaskList.find = sinon.spy(function (id, callback) {
            callback(null, new TaskList);
        });
        test.get('/tasklists/42', function (req, res) {
            test.ok(TaskList.find.calledWith('42'));
            TaskList.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var tasklist = new ValidAttributes;
        var create = TaskList.create;
        TaskList.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, tasklist);
            callback(null, tasklist);
        });
        test.post('/tasklists', {TaskList: tasklist}, function () {
            test.redirect('/tasklists');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var tasklist = new ValidAttributes;
        var create = TaskList.create;
        TaskList.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, tasklist);
            callback(new Error, tasklist);
        });
        test.post('/tasklists', {TaskList: tasklist}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        TaskList.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/tasklists/1', new ValidAttributes, function () {
            test.redirect('/tasklists/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        TaskList.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/tasklists/1', new ValidAttributes, function () {
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

