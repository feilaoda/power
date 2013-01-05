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
    return App.Project.all(function(err, projects) {
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
    var _this = this;
    return App.Project.find(this.params.id, function(error, project) {
      if (error || project === null) {
        return _this.render({
          json: {
            stat: 'fail'
          }
        });
      }
      App.Tasklist.where({
        projectId: _this.params.id
      }).destroy(function(error) {
        return console.log("destroy tasklist", error);
      });
      App.Task.where({
        projectId: _this.params.id
      }).destroy(function(error) {
        return console.log("destroy task", error);
      });
      return project.destroy(function(error) {
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
              project: project
            }
          });
        }
      });
    });
  });

  __defineProperty(ProjectsController,  "show", function() {
    var projectId, tasklists,
      _this = this;
    _this = this;
    projectId = this.params.id;
    tasklists = {};
    App.Project.find(projectId, function(err, project) {
      if (err || project === null) {
        return _this.render({
          json: {
            stat: 'fail',
            error: '404:project'
          }
        });
      } else {
        _this.project = project;
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
            project: _this.project,
            tasklists: tasklists
          },
          status: 200
        });
      });
    });
  });

  return ProjectsController;

})(App.ApplicationController);
