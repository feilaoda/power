(function() {

  describe('App.User', function() {
    var user;
    user = void 0;
    describe('fields', function() {
      beforeEach(function(done) {
        user = App.User.build({
          username: 'A username',
          email: 'A email',
          password: 'A password',
          createTime: 'A createTime'
        });
        return done();
      });
      test('username', function() {
        return assert.ok(user.get('username'));
      });
      test('email', function() {
        return assert.ok(user.get('email'));
      });
      test('password', function() {
        return assert.ok(user.get('password'));
      });
      return test('createTime', function() {
        return assert.ok(user.get('createTime'));
      });
    });
    return describe('relations', function() {});
  });

}).call(this);
