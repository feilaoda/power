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

App.ProjectsController = (function(_super) {
  var ProjectsController, Step;

  function ProjectsController() {
    return ProjectsController.__super__.constructor.apply(this, arguments);
  }

  ProjectsController = __extends(ProjectsController, _super);

  ProjectsController.param('title');

  ProjectsController.scope('all');

  Step = require('step');

  ProjectsController.beforeAction('setContentType');

  __defineProperty(ProjectsController,  "setContentType", function() {
    return this.headers['Content-Type'] = "application/json; charset=UTF-8";
  });

  __defineProperty(ProjectsController,  "index", function() {
    var _this = this;
    return App.Project.all(function(error, projects) {
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
            projects: projects
          }
        });
      }
    });
  });

  __defineProperty(ProjectsController,  "create", function() {
    var _this = this;
    console.log(this.params);
    this.project = App.Project.build({
      title: this.params.title
    });
    return this.project.save(function(error) {
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
            project: _this.project
          }
        });
      }
    });
  });

  __defineProperty(ProjectsController,  "destroy", function() {
    return this.render({
      json: {
        stat: 'fail',
        error: "not supported"
      }
    });
  });

  __defineProperty(ProjectsController,  "member", function() {
    var _this = this;
    return App.Project.find(this.params.id, function(error, project) {
      if (error || project === null) {
        return _this.render({
          json: {
            stat: '404',
            error: 'project not found'
          }
        });
      }
      _this.project = project;
      return App.Member.where({
        projectId: _this.params.id
      }).all(function(error, members) {
        if (error) {
          return _this.render({
            json: {
              stat: 'fail',
              error: error
            }
          });
        }
        return _this.render({
          json: {
            stat: 'ok',
            project: _this.project,
            members: members
          }
        });
      });
    });
  });

  __defineProperty(ProjectsController,  "show", function() {
    var projectId, tasklists,
      _this = this;
    _this = this;
    projectId = this.params.id;
    tasklists = {};
    App.Project.find(this.params.id, function(err, project) {
      if (err || project === null) {
        return _this.render({
          json: {
            stat: '404',
            error: 'project not found'
          }
        });
      } else {
        _this.project = project;
      }
      if (_this.params.single === 'true') {
        return _this.render({
          json: {
            stat: 'ok',
            project: project
          }
        });
      }
      return Step(function() {
        App.Tasklist.where({
          projectId: projectId
        }).all(this);
      }, function(err, tls) {
        var parallel, tasklist, tasklistId, _i, _len;
        if (err) {
          return [];
        }
        parallel = this.parallel;
        if (tls.length > 0) {
          for (_i = 0, _len = tls.length; _i < _len; _i++) {
            tasklist = tls[_i];
            tasklistId = tasklist.get('id');
            tasklists[tasklistId] = tasklist.toJSON();
            App.Task.where({
              tasklistId: tasklistId,
              status: 'todo'
            }).all(parallel());
          }
        } else {
          return [];
        }
      }, function(err) {
        var data, json_data, tasklistId, tasks, tl, _i, _j, _len, _len1, _ref;
        _ref = Array.prototype.slice.call(arguments, 1);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          data = _ref[_i];
          if (data !== void 0 && data.length > 0) {
            tasklistId = data[0].get('tasklistId');
            if (tasklistId !== void 0) {
              tasks = [];
              for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
                tl = data[_j];
                tasks.push(tl.toJSON());
              }
              if (tasks.length > 0) {
                tasklists[tasklistId]['tasks'] = tasks;
              }
            }
          }
        }
        json_data = {
          project: {
            id: projectId
          },
          tasklists: tasklists
        };
        return _this.render({
          json: {
            stat: 'ok',
            project: _this.project,
            tasklists: tasklists
          },
          status: 200
        });
      });
    });
  });

  __defineProperty(ProjectsController,  "update", function() {
    var _this = this;
    return App.Project.find(this.params.id, function(error, project) {
      var attrs;
      if (error || project === null) {
        return _this.render({
          json: {
            stat: '404',
            error: 'project not found'
          }
        });
      }
      attrs = {};
      if (_this.params.title !== void 0) {
        attrs['title'] = _this.params.title;
      }
      return project.updateAttributes(attrs, function(error) {
        if (error) {
          return _this.render({
            json: {
              stat: 'fail',
              error: error
            }
          });
        }
        return _this.render({
          json: {
            stat: 'ok'
          }
        });
      });
    });
  });

  return ProjectsController;

})(App.ApplicationController);
