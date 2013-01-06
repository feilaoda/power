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

  App.ProjectUsersController = (function(_super) {
    var ProjectUsersController;

    function ProjectUsersController() {
      return ProjectUsersController.__super__.constructor.apply(this, arguments);
    }

    ProjectUsersController = __extends(ProjectUsersController, _super);

    ProjectUsersController.scope('all');

    __defineProperty(ProjectUsersController,  "create", function() {
      var _this = this;
      console.log(this.params);
      this.projectUser = App.ProjectUser.build();
      return App.Project.find(this.params.projectId, function(error, project) {
        if (error || project === null) {
          return _this.render({
            json: {
              stat: '404',
              error: 'project not found'
            }
          });
        }
        _this.project = project;
        return App.User.where({
          email: _this.params.email
        }).first(function(error, user) {
          if (error || user === null) {
            return _this.render({
              json: {
                stat: '404',
                error: 'user not found'
              }
            });
          }
          _this.projectUser.set('projectId', _this.project.get('id'));
          _this.projectUser.set('userId', user.get('id'));
          return _this.projectUser.save(function(error) {
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
                  projectUser: _this.projectUser
                }
              });
            }
          });
        });
      });
    });

    return ProjectUsersController;

  })(App.ApplicationController);

}).call(this);
