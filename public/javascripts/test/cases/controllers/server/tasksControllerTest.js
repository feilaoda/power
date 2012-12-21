(function() {

  describe('TasksController', function() {
    var controller, task, url;
    controller = void 0;
    task = void 0;
    url = void 0;
    beforeEach(function(done) {
      controller = App.TasksController.create();
      agent.controller = controller;
      return Tower.start(done);
    });
    afterEach(function() {
      Tower.stop();
      return delete agent.controller;
    });
    describe('routes', function() {
      test('index', function() {
        return assert.equal(urlFor(App.Task), "/tasks");
      });
      test('new', function() {
        task = App.Task.build();
        return assert.equal(urlFor(task, {
          action: 'new'
        }), "/tasks/new");
      });
      test('show', function() {
        task = new App.Task({
          id: 1
        });
        return assert.equal(urlFor(task), "/tasks/" + (task.get('id')));
      });
      return test('edit', function() {
        task = new App.Task({
          id: 1
        });
        return assert.equal(urlFor(task, {
          action: 'edit'
        }), "/tasks/" + (task.get('id')) + "/edit");
      });
    });
    describe('#index', function() {
      beforeEach(function(done) {
        var _this = this;
        return factory('task', function(error, record) {
          task = record;
          return done();
        });
      });
      return test('render json', function(done) {
        return get(urlFor(App.Task), {
          format: "json"
        }, function(request) {
          assert.equal(this.headers["Content-Type"], 'application/json');
          return done();
        });
      });
    });
    describe('#new', function() {});
    describe('#create', function() {
      beforeEach(function() {
        return url = urlFor(App.Task);
      });
      return test('params', function(done) {
        var params;
        params = {};
        return post(url, {
          format: "json",
          params: params
        }, function(response) {
          var _this = this;
          return App.Task.count(function(error, count) {
            assert.equal(count, 1);
            return done();
          });
        });
      });
    });
    describe("#show", function() {});
    describe("#edit", function() {});
    describe("#update", function() {});
    return describe("#destroy", function() {});
  });

}).call(this);
