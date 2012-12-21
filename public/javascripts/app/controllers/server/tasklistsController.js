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

  App.TasklistsController = (function(_super) {
    var TasklistsController;

    function TasklistsController() {
      return TasklistsController.__super__.constructor.apply(this, arguments);
    }

    TasklistsController = __extends(TasklistsController, _super);

    TasklistsController.param('title');

    TasklistsController.param('projectId', {
      exact: true
    });

    TasklistsController.scope('all');

    TasklistsController.beforeAction('setContentType');

    __defineProperty(TasklistsController,  "setContentType", function() {
      return this.headers['Content-Type'] = "application/json; charset=UTF-8";
    });

    __defineProperty(TasklistsController,  "create", function() {
      var _this = this;
      this.tasklist = App.Tasklist.build({
        title: this.params.title
      });
      return App.Project.find(this.params.projectId, function(error, project) {
        if (error || project === null) {
          return _this.render({
            text: {
              stat: 'fail',
              error: '404'
            }
          });
        }
        _this.tasklist.set('projectId', project.get('id'));
        return _this.tasklist.save(function(err) {
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
                tasklist: _this.tasklist
              }
            });
          }
        });
      });
    });

    __defineProperty(TasklistsController,  "show", function() {
      var _this = this;
      return App.Tasklist.find(this.params.id, function(error, tasklist) {
        if (error || tasklist === null) {
          return _this.render({
            json: {
              stat: 'fail',
              error: '404'
            }
          });
        }
        console.log("tasklist ", tasklist);
        _this.tasklist = tasklist;
        return App.Task.where({
          tasklistId: _this.params.id
        }).all(function(error, tasks) {
          var json_data, json_tasks, t, _i, _len;
          if (error) {
            _this.render({
              json: {
                stat: 'fail',
                error: '404'
              }
            });
          }
          json_data = _this.tasklist.toJSON();
          console.log(tasks);
          json_tasks = [];
          for (_i = 0, _len = tasks.length; _i < _len; _i++) {
            t = tasks[_i];
            console.log(t.toJSON());
            json_tasks.push(t.toJSON());
          }
          json_data['tasks'] = json_tasks;
          return _this.render({
            json: {
              stat: 'ok',
              tasklist: json_data
            }
          });
        });
      });
    });

    return TasklistsController;

  })(App.ApplicationController);

}).call(this);
