var __defineProperty = function(clazz, key, value) {
  if (typeof clazz.__defineProperty == 'function') return clazz.__defineProperty(key, value);
  return clazz.prototype[key] = value;
},
  __hasProp = {}.hasOwnProperty,
  __extends =   function(child, parent) {
    if (typeof parent.__extend == 'function') return parent.__extend(child);
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } 
    function ctor() { this.constructor = child; } 
    ctor.prototype = parent.prototype; 
    child.prototype = new ctor; 
    child.__super__ = parent.prototype; 
    if (typeof parent.extended == 'function') parent.extended(child); 
    return child; 
};

App.SessionsController = (function(_super) {
  var SessionsController;

  function SessionsController() {
    return SessionsController.__super__.constructor.apply(this, arguments);
  }

  SessionsController = __extends(SessionsController, _super);

  SessionsController.param('provider');

  SessionsController.param('uid');

  SessionsController.param('username');

  SessionsController.scope('all');

  SessionsController.beforeAction('setContentType');

  __defineProperty(SessionsController,  "setContentType", function() {
    return this.headers['Content-Type'] = "application/json; charset=UTF-8";
  });

  __defineProperty(SessionsController,  "create", function() {
    var _this = this;
    return App.User.findOrCreateFromSession(this.request.authHash, function(error, user) {
      if (error || user === null) {
        return _this.render({
          json: {
            stat: 'fail'
          }
        });
      }
      _this.response.cookie('user', user.get('id'), {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: false
      });
      return _this.response.redirect("/");
    });
  });

  return SessionsController;

})(App.ApplicationController);
