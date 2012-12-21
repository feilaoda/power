(function() {
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

  App.ApplicationController = (function(_super) {
    var ApplicationController;

    function ApplicationController() {
      return ApplicationController.__super__.constructor.apply(this, arguments);
    }

    ApplicationController = __extends(ApplicationController, _super);

    ApplicationController.layout('application');

    ApplicationController.param('page', {
      type: 'Number',
      allowRange: false,
      allowNegative: false
    });

    ApplicationController.param('limit', {
      type: 'Number',
      allowRange: false,
      allowNegative: false
    });

    ApplicationController.param('sort', {
      type: 'Order'
    });

    ApplicationController.param('fields', {
      type: 'Array'
    });

    ApplicationController.param('createdAt', {
      type: 'Date'
    });

    ApplicationController.param('updatedAt', {
      type: 'Date'
    });

    ApplicationController.beforeAction('bootstrap');

    __defineProperty(ApplicationController,  "welcome", function() {
      return this.render('welcome', {
        locals: {
          bootstrapData: this.bootstrapData
        }
      });
    });

    __defineProperty(ApplicationController,  "bootstrap", function(callback) {
      var data,
        _this = this;
      data = this.bootstrapData = {};
      return _.series([
        function(next) {
          return App.User.all(function(error, users) {
            data.users = users;
            return next();
          });
        }, function(next) {
          return App.Project.all(function(error, projects) {
            data.projects = projects;
            return next();
          });
        }
      ], callback);
    });

    return ApplicationController;

  })(Tower.Controller);

}).call(this);
