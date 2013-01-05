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

App.UsersController = (function(_super) {
  var UsersController;

  function UsersController() {
    return UsersController.__super__.constructor.apply(this, arguments);
  }

  UsersController = __extends(UsersController, _super);

  UsersController.param('username');

  UsersController.param('email');

  UsersController.param('password');

  UsersController.scope('all');

  UsersController.beforeAction('setContentType');

  __defineProperty(UsersController,  "setContentType", function() {
    return this.headers['Content-Type'] = "application/json; charset=UTF-8";
  });

  __defineProperty(UsersController,  "index", function() {
    var _this = this;
    return App.User.all(function(err, users) {
      if (err) {
        return _this.render({
          json: {
            stat: 'fail'
          }
        });
      } else {
        return _this.render({
          json: {
            stat: 'ok',
            users: users
          }
        });
      }
    });
  });

  __defineProperty(UsersController,  "create", function() {
    var _this = this;
    console.log(this.params);
    this.user = App.User.build({
      username: this.params.username,
      email: this.params.email,
      password: this.params.password
    });
    return this.user.save(function(error) {
      if (error) {
        return _this.render({
          json: {
            stat: 'fail'
          }
        });
      } else {
        return _this.render({
          json: {
            stat: 'ok',
            user: _this.user
          }
        });
      }
    });
  });

  return UsersController;

})(App.ApplicationController);
