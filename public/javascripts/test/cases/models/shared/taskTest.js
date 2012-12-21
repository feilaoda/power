(function() {

  describe('App.Task', function() {
    var task;
    task = void 0;
    describe('fields', function() {
      beforeEach(function(done) {
        task = App.Task.build({
          title: 'A title'
        });
        return done();
      });
      return test('title', function() {
        return assert.ok(task.get('title'));
      });
    });
    return describe('relations', function() {});
  });

}).call(this);
