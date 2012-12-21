(function() {

  describe('UsersController', function() {
    var controller, url, user;
    controller = void 0;
    user = void 0;
    url = void 0;
    beforeEach(function(done) {
      controller = App.UsersController.create();
      agent.controller = controller;
      return Tower.start(done);
    });
    afterEach(function() {
      Tower.stop();
      return delete agent.controller;
    });
    describe('routes', function() {
      test('index', function() {
        return assert.equal(urlFor(App.User), "/users");
      });
      test('new', function() {
        user = App.User.build();
        return assert.equal(urlFor(user, {
          action: 'new'
        }), "/users/new");
      });
      test('show', function() {
        user = new App.User({
          id: 1
        });
        return assert.equal(urlFor(user), "/users/" + (user.get('id')));
      });
      return test('edit', function() {
        user = new App.User({
          id: 1
        });
        return assert.equal(urlFor(user, {
          action: 'edit'
        }), "/users/" + (user.get('id')) + "/edit");
      });
    });
    describe('#index', function() {
      beforeEach(function(done) {
        var _this = this;
        return factory('user', function(error, record) {
          user = record;
          return done();
        });
      });
      return test('render json', function(done) {
        return get(urlFor(App.User), {
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
        return url = urlFor(App.User);
      });
      return test('params', function(done) {
        var params;
        params = {};
        return post(url, {
          format: "json",
          params: params
        }, function(response) {
          var _this = this;
          return App.User.count(function(error, count) {
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
