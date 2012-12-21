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

  App.ProjectsController = (function(_super) {
    var ProjectsController, Step;

    function ProjectsController() {
      return ProjectsController.__super__.constructor.apply(this, arguments);
    }

    ProjectsController = __extends(ProjectsController, _super);

    ProjectsController.param('title');

    ProjectsController.param('createTime');

    ProjectsController.scope('all');

    Step = require('step');

    __defineProperty(ProjectsController,  "show", function() {
      var projectId, tasklists, _this;
      _this = this;
      projectId = this.params.id;
      tasklists = {};
      console.log("projectId is: " + projectId);
      Step(function() {
        App.Tasklist.where({
          projectId: projectId
        }).all(this);
      }, function(err, tls) {
        var parallel, tasklist, tasklistId, _i, _len;
        if (err) {
          return [];
        }
        console.log("tasklist count is: ", tls.length);
        parallel = this.parallel;
        if (tls.length > 0) {
          for (_i = 0, _len = tls.length; _i < _len; _i++) {
            tasklist = tls[_i];
            tasklistId = tasklist.get('id');
            console.log(tasklist.get('title'), tasklistId);
            tasklists[tasklistId] = tasklist.toJSON();
            App.Task.where({
              tasklistId: tasklistId
            }).all(parallel());
          }
        } else {
          return [];
        }
      }, function(err) {
        var data, json_data, tasklistId, tasks, tl, _i, _j, _len, _len1, _ref;
        console.log("arguments: ", Array.prototype.slice.call(arguments, 1));
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
        console.log("task tasklistId: ", tasklists, json_data);
        return _this.render({
          json: {
            project: {
              id: projectId
            },
            tasklists: tasklists
          },
          status: 200
        });
      });
    });

    return ProjectsController;

  })(App.ApplicationController);

}).call(this);
