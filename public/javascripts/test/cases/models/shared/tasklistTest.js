(function() {

  describe('App.Tasklist', function() {
    var tasklist;
    tasklist = void 0;
    describe('fields', function() {
      beforeEach(function(done) {
        tasklist = App.Tasklist.build({
          title: 'A title'
        });
        return done();
      });
      return test('title', function() {
        return assert.ok(tasklist.get('title'));
      });
    });
    return describe('relations', function() {});
  });

}).call(this);
