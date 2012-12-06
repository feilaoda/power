require('../test_helper.js').controller('tasks', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        project: '',
        user: '',
        finishTime: '',
        created: ''
    };
}

exports['tasks controller'] = {

    'GET new': function (test) {
        test.get('/tasks/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/tasks', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Task.find;
        Task.find = sinon.spy(function (id, callback) {
            callback(null, new Task);
        });
        test.get('/tasks/42/edit', function () {
            test.ok(Task.find.calledWith('42'));
            Task.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Task.find;
        Task.find = sinon.spy(function (id, callback) {
            callback(null, new Task);
        });
        test.get('/tasks/42', function (req, res) {
            test.ok(Task.find.calledWith('42'));
            Task.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var task = new ValidAttributes;
        var create = Task.create;
        Task.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, task);
            callback(null, task);
        });
        test.post('/tasks', {Task: task}, function () {
            test.redirect('/tasks');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var task = new ValidAttributes;
        var create = Task.create;
        Task.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, task);
            callback(new Error, task);
        });
        test.post('/tasks', {Task: task}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Task.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/tasks/1', new ValidAttributes, function () {
            test.redirect('/tasks/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Task.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/tasks/1', new ValidAttributes, function () {
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

