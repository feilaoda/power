(function() {

  describe('App.Session', function() {
    var session;
    session = void 0;
    describe('fields', function() {
      beforeEach(function(done) {
        session = App.Session.build({
          provider: 'A provider',
          uid: 'A uid',
          username: 'A username'
        });
        return done();
      });
      test('provider', function() {
        return assert.ok(session.get('provider'));
      });
      test('uid', function() {
        return assert.ok(session.get('uid'));
      });
      return test('username', function() {
        return assert.ok(session.get('username'));
      });
    });
    return describe('relations', function() {});
  });

}).call(this);
