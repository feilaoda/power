(function() {

  App.bootstrap = function(data) {
    if (data.tasklists) {
      App.Tasklist.load(data.tasklists);
    }
    if (data.tasks) {
      App.Task.load(data.tasks);
    }
    if (data.users) {
      App.User.load(data.users);
    }
    if (data.projects) {
      App.Project.load(data.projects);
    }
    Ember.Handlebars.bootstrap(Ember.$(document));
    Tower.NetConnection.transport = Tower.StoreTransportAjax;
    if (Tower.env === 'development') {
      Tower.StoreTransportAjax.defaults.async = false;
    }
    App.initialize();
    App.listen();
    Ember.run.autorun();
    return Ember.run.currentRunLoop.flush('render');
  };

  if (Tower.env === 'development') {
    $(function() {
      var watch, watchInterval,
        _this = this;
      watch = function() {
        if (Tower.connection) {
          App.watchers.watch();
          return clearInterval(watchInterval);
        }
      };
      return watchInterval = setInterval(watch, 500);
    });
  }

}).call(this);
