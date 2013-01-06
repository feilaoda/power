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

  App.TasksController = (function(_super) {
    var TasksController;

    function TasksController() {
      return TasksController.__super__.constructor.apply(this, arguments);
    }

    TasksController = __extends(TasksController, _super);

    TasksController.param('title');

    TasksController.scope('all');

    TasksController.beforeAction('setContentType');

    __defineProperty(TasksController,  "setContentType", function() {
      return this.headers['Content-Type'] = "application/json; charset=UTF-8";
    });

    __defineProperty(TasksController,  "show", function() {
      var _this = this;
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
        return App.Task.find(_this.params.id, function(error, task) {
          if (error || task === null || task.get('projectId').toString() !== _this.project.get('id').toString()) {
            return _this.render({
              json: {
                stat: '404',
                error: 'task  not found'
              }
            });
          }
          _this.task = task;
          return App.Tasklist.find(_this.task.get('tasklistId'), function(error, tasklist) {
            if (error || tasklist === null) {
              return _this.render({
                json: {
                  stat: '404',
                  error: 'tasklist  not found'
                }
              });
            }
            console.log(tasklist);
            return _this.render({
              json: {
                stat: 'ok',
                project: _this.project,
                tasklist: tasklist,
                task: _this.task
              }
            });
          });
        });
      });
    });

    __defineProperty(TasksController,  "create", function() {
      var tasklistId,
        _this = this;
      this.task = App.Task.build({
        title: this.params.title,
        status: 'todo'
      });
      tasklistId = this.params.tasklistId;
      return App.Project.find(this.params.projectId, function(error, project) {
        if (error || project === null) {
          return _this.render({
            json: {
              stat: '404',
              error: 'project  not found'
            }
          });
        }
        _this.task.set('tasklistId', tasklistId);
        _this.task.set('projectId', project.get('id'));
        return _this.task.save(function(error) {
          if (error) {
            return _this.render({
              json: {
                stat: 'fail',
                error: error
              }
            });
          } else {
            return _this.render({
              json: {
                stat: 'ok',
                task: _this.task
              }
            });
          }
        });
      });
    });

    __defineProperty(TasksController,  "destroy", function() {
      var _this = this;
      console.log(this.params);
      return App.Task.find(this.params.id, function(error, task) {
        if (error || task === null) {
          return _this.render({
            json: {
              stat: '404',
              error: 'task  not found'
            }
          });
        }
        _this.task = task;
        return App.Project.find(_this.params.projectId, function(error, project) {
          if (error || project === null || _this.task.get('projectId').toString() !== _this.params.projectId) {
            return _this.render({
              json: {
                stat: '404',
                error: 'project  not found'
              }
            });
          }
          return _this.task.destroy(function(error) {
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
    });

    __defineProperty(TasksController,  "update", function() {
      var _this = this;
      return App.Task.find(this.params.id, function(error, task) {
        var attrs, now, status, updatedAt;
        if (error || task === null) {
          return _this.render({
            json: {
              stat: '404',
              error: 'task  not found'
            }
          });
        }
        attrs = {};
        if (_this.params.status !== void 0) {
          if (_this.params.status === 'done') {
            status = 'done';
          } else {
            status = 'todo';
          }
          now = new Date();
          updatedAt = now.getTime();
          attrs['updatedAt'] = updatedAt;
          attrs['status'] = status;
        }
        if (_this.params.title !== void 0) {
          attrs['title'] = _this.params.title;
        }
        return task.updateAttributes(attrs, function(error) {
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

    return TasksController;

  })(App.ApplicationController);

}).call(this);
