(function() {

  describe('App.Project', function() {
    var project;
    project = void 0;
    describe('fields', function() {
      beforeEach(function(done) {
        project = App.Project.build({
          title: 'A title',
          createTime: 'A createTime'
        });
        return done();
      });
      test('title', function() {
        return assert.ok(project.get('title'));
      });
      return test('createTime', function() {
        return assert.ok(project.get('createTime'));
      });
    });
    return describe('relations', function() {});
  });

}).call(this);
