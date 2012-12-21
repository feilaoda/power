(function() {

  describe('TasklistsController', function() {
    var controller, tasklist, url;
    controller = void 0;
    tasklist = void 0;
    url = void 0;
    beforeEach(function(done) {
      controller = App.TasklistsController.create();
      agent.controller = controller;
      return Tower.start(done);
    });
    afterEach(function() {
      Tower.stop();
      return delete agent.controller;
    });
    describe('routes', function() {
      test('index', function() {
        return assert.equal(urlFor(App.Tasklist), "/tasklists");
      });
      test('new', function() {
        tasklist = App.Tasklist.build();
        return assert.equal(urlFor(tasklist, {
          action: 'new'
        }), "/tasklists/new");
      });
      test('show', function() {
        tasklist = new App.Tasklist({
          id: 1
        });
        return assert.equal(urlFor(tasklist), "/tasklists/" + (tasklist.get('id')));
      });
      return test('edit', function() {
        tasklist = new App.Tasklist({
          id: 1
        });
        return assert.equal(urlFor(tasklist, {
          action: 'edit'
        }), "/tasklists/" + (tasklist.get('id')) + "/edit");
      });
    });
    describe('#index', function() {
      beforeEach(function(done) {
        var _this = this;
        return factory('tasklist', function(error, record) {
          tasklist = record;
          return done();
        });
      });
      return test('render json', function(done) {
        return get(urlFor(App.Tasklist), {
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
        return url = urlFor(App.Tasklist);
      });
      return test('params', function(done) {
        var params;
        params = {};
        return post(url, {
          format: "json",
          params: params
        }, function(response) {
          var _this = this;
          return App.Tasklist.count(function(error, count) {
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
