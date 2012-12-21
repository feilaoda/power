(function() {

  describe('ProjectsController', function() {
    var controller, project, url;
    controller = void 0;
    project = void 0;
    url = void 0;
    beforeEach(function(done) {
      controller = App.ProjectsController.create();
      agent.controller = controller;
      return Tower.start(done);
    });
    afterEach(function() {
      Tower.stop();
      return delete agent.controller;
    });
    describe('routes', function() {
      test('index', function() {
        return assert.equal(urlFor(App.Project), "/projects");
      });
      test('new', function() {
        project = App.Project.build();
        return assert.equal(urlFor(project, {
          action: 'new'
        }), "/projects/new");
      });
      test('show', function() {
        project = new App.Project({
          id: 1
        });
        return assert.equal(urlFor(project), "/projects/" + (project.get('id')));
      });
      return test('edit', function() {
        project = new App.Project({
          id: 1
        });
        return assert.equal(urlFor(project, {
          action: 'edit'
        }), "/projects/" + (project.get('id')) + "/edit");
      });
    });
    describe('#index', function() {
      beforeEach(function(done) {
        var _this = this;
        return factory('project', function(error, record) {
          project = record;
          return done();
        });
      });
      return test('render json', function(done) {
        return get(urlFor(App.Project), {
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
        return url = urlFor(App.Project);
      });
      return test('params', function(done) {
        var params;
        params = {};
        return post(url, {
          format: "json",
          params: params
        }, function(response) {
          var _this = this;
          return App.Project.count(function(error, count) {
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
