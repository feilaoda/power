(function() {

  describe('SessionsController', function() {
    var controller, session, url;
    controller = void 0;
    session = void 0;
    url = void 0;
    beforeEach(function(done) {
      controller = App.SessionsController.create();
      agent.controller = controller;
      return Tower.start(done);
    });
    afterEach(function() {
      Tower.stop();
      return delete agent.controller;
    });
    describe('routes', function() {
      test('index', function() {
        return assert.equal(urlFor(App.Session), "/sessions");
      });
      test('new', function() {
        session = App.Session.build();
        return assert.equal(urlFor(session, {
          action: 'new'
        }), "/sessions/new");
      });
      test('show', function() {
        session = new App.Session({
          id: 1
        });
        return assert.equal(urlFor(session), "/sessions/" + (session.get('id')));
      });
      return test('edit', function() {
        session = new App.Session({
          id: 1
        });
        return assert.equal(urlFor(session, {
          action: 'edit'
        }), "/sessions/" + (session.get('id')) + "/edit");
      });
    });
    describe('#index', function() {
      beforeEach(function(done) {
        var _this = this;
        return factory('session', function(error, record) {
          session = record;
          return done();
        });
      });
      return test('render json', function(done) {
        return get(urlFor(App.Session), {
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
        return url = urlFor(App.Session);
      });
      return test('params', function(done) {
        var params;
        params = {};
        return post(url, {
          format: "json",
          params: params
        }, function(response) {
          var _this = this;
          return App.Session.count(function(error, count) {
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
