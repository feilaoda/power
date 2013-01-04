(function() {

  global.App = Tower.Application.create();

}).call(this);


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


(function() {

  App.watchers = {
    stylesheets: {
      nodes: {},
      create: function(data) {
        return this.update(data);
      },
      update: function(data) {
        var newNode, node, nodes;
        nodes = this.nodes;
        if (nodes[data.path] != null) {
          node = nodes[data.path];
        } else {
          node = $("link[href='" + data.url + "']");
        }
        data.url = null;
        if (node) {
          if (data.url) {
            node.attr("href", "" + data.url + "?" + ((new Date()).getTime().toString()));
          } else {
            newNode = $("<style id='" + data.path + "' type='text/css'>" + data.content + "</style>");
            node.replaceWith(newNode);
            node = newNode;
          }
        } else {
          node = $("<style id='" + data.path + "' type='text/css'>" + data.content + "</style>");
          $("body").append(node);
        }
        return nodes[data.path] = node;
      },
      destroy: function(data) {
        if (this.nodes[data.path] != null) {
          return this.nodes[data.path].remove();
        }
      }
    },
    javascripts: {
      create: function(data) {},
      update: function(data) {
        return eval("(function() { " + data.content + " })")();
      }
    },
    watch: function() {
      var _this = this;
      Tower.connection.on('fileCreated', function(data) {
        return _this._handle('create', data);
      });
      return Tower.connection.on('fileUpdated', function(data) {
        return _this._handle('update', data);
      });
    },
    _handle: function(action, data) {
      data = JSON.parse(data, this._jsonReviver);
      if (data.path.match(/\.js$/)) {
        return this.javascripts[action](data);
      } else if (data.path.match(/\.css$/)) {
        return this.stylesheets[action](data);
      }
    },
    _jsonReviver: function(key, value) {
      if (typeof value === "string" && !!value.match(/^(?:\(function\s*\([^\)]*\)\s*\{|\(\/)/) && !!value.match(/(?:\}\s*\)|\/\w*\))$/)) {
        return eval(value);
      } else {
        return value;
      }
    }
  };

}).call(this);


(function() {

  Tower.Route.draw(function() {
    this.resources('tasklists');
    this.resources('users');
    this.resources('projects');
    this.resources('tasks');
    this.namespace('api', function() {
      return this.match('projects', {
        to: 'projects#all'
      }, 'projects/:id', {
        to: 'projects#show'
      });
    });
    return this.match('/', {
      to: 'application#welcome'
    });
  });

}).call(this);


(function() {
  var __hasProp = {}.hasOwnProperty,
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

    return ApplicationController;

  })(Tower.Controller);

}).call(this);


(function() {

  App.ApplicationView = Ember.View.extend({
    templateName: 'application'
  });

}).call(this);


(function() {
  var __hasProp = {}.hasOwnProperty,
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

  App.Project = (function(_super) {
    var Project;

    function Project() {
      return Project.__super__.constructor.apply(this, arguments);
    }

    Project = __extends(Project, _super);

    Project.field('title', {
      type: 'String'
    });

    Project.hasMany('tasklists');

    Project.hasMany('tasks');

    Project.timestamps();

    return Project;

  })(Tower.Model);

}).call(this);


(function() {

  App.ProjectsEditView = Ember.View.extend({
    templateName: 'projects/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('projects.index');
      return false;
    }
  });

}).call(this);


(function() {

  App.ProjectsIndexView = Ember.View.extend({
    templateName: 'projects/index'
  });

}).call(this);


(function() {

  App.ProjectsShowView = Ember.View.extend({
    templateName: 'projects/show'
  });

}).call(this);


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
  var ProjectsController;

  function ProjectsController() {
    return ProjectsController.__super__.constructor.apply(this, arguments);
  }

  ProjectsController = __extends(ProjectsController, _super);

  ProjectsController.scope('all');

  __defineProperty(ProjectsController,  "destroy", function() {
    return this.get('resource').destroy();
  });

  return ProjectsController;

})(Tower.Controller);


(function() {
  var __hasProp = {}.hasOwnProperty,
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

  App.User = (function(_super) {
    var User;

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User = __extends(User, _super);

    User.field('username', {
      type: 'String'
    });

    User.field('email', {
      type: 'String'
    });

    User.field('password', {
      type: 'String'
    });

    User.field('createTime', {
      type: 'Date'
    });

    User.timestamps();

    return User;

  })(Tower.Model);

}).call(this);


(function() {

  App.UsersEditView = Ember.View.extend({
    templateName: 'users/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('users.index');
      return false;
    }
  });

}).call(this);


(function() {

  App.UsersIndexView = Ember.View.extend({
    templateName: 'users/index'
  });

}).call(this);


(function() {

  App.UsersShowView = Ember.View.extend({
    templateName: 'users/show'
  });

}).call(this);


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

  App.UsersController = (function(_super) {
    var UsersController;

    function UsersController() {
      return UsersController.__super__.constructor.apply(this, arguments);
    }

    UsersController = __extends(UsersController, _super);

    UsersController.scope('all');

    __defineProperty(UsersController,  "destroy", function() {
      return this.get('resource').destroy();
    });

    return UsersController;

  })(Tower.Controller);

}).call(this);


(function() {
  var __hasProp = {}.hasOwnProperty,
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

  App.Task = (function(_super) {
    var Task;

    function Task() {
      return Task.__super__.constructor.apply(this, arguments);
    }

    Task = __extends(Task, _super);

    Task.field('title', {
      type: 'String'
    });

    Task.field('status', {
      type: 'String'
    });

    Task.belongsTo('project', {
      type: 'Project'
    });

    Task.belongsTo('tasklist', {
      type: 'Tasklist'
    });

    Task.timestamps();

    return Task;

  })(Tower.Model);

}).call(this);


(function() {

  App.TasksEditView = Ember.View.extend({
    templateName: 'tasks/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('tasks.index');
      return false;
    }
  });

}).call(this);


(function() {

  App.TasksIndexView = Ember.View.extend({
    templateName: 'tasks/index'
  });

}).call(this);


(function() {

  App.TasksShowView = Ember.View.extend({
    templateName: 'tasks/show'
  });

}).call(this);


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

  TasksController.scope('all');

  __defineProperty(TasksController,  "destroy", function() {
    return this.get('resource').destroy();
  });

  return TasksController;

})(Tower.Controller);


(function() {
  var __hasProp = {}.hasOwnProperty,
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

  App.Tasklist = (function(_super) {
    var Tasklist;

    function Tasklist() {
      return Tasklist.__super__.constructor.apply(this, arguments);
    }

    Tasklist = __extends(Tasklist, _super);

    Tasklist.field('title', {
      type: 'String'
    });

    Tasklist.belongsTo('project', {
      type: 'Project'
    });

    Tasklist.hasMany('tasks');

    Tasklist.timestamps();

    return Tasklist;

  })(Tower.Model);

}).call(this);


(function() {

  App.TasklistsEditView = Ember.View.extend({
    templateName: 'tasklists/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('tasklists.index');
      return false;
    }
  });

}).call(this);


(function() {

  App.TasklistsIndexView = Ember.View.extend({
    templateName: 'tasklists/index'
  });

}).call(this);


(function() {

  App.TasklistsShowView = Ember.View.extend({
    templateName: 'tasklists/show'
  });

}).call(this);


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

  TasklistsController.scope('all');

  __defineProperty(TasklistsController,  "destroy", function() {
    return this.get('resource').destroy();
  });

  return TasklistsController;

})(Tower.Controller);



var power = angular.module('power', ['projectFilters', 'projectServices', 'tasklistServices', 'taskServices', 'userServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/projects', {templateUrl: 'views/project-list.html',   controller: ProjectListCtrl}).
      when('/projects/:projectId', {templateUrl: 'views/project-detail.html', controller: ProjectDetailCtrl}).
      when('/projects/:projectId/tasklists/:tasklistId', {templateUrl: 'views/tasklist-detail.html', controller: TaskListDetailCtrl}).
      when('/projects/:projectId/tasks/:taskId', {templateUrl: 'views/task-detail.html', controller: TaskDetailCtrl}).
      when('/users', {templateUrl: 'views/user-list.html',   controller: UserListCtrl}).
      otherwise({redirectTo: '/projects'});
}]);

var now = new Date();

power.directive('tasklist', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {tasklist:'=', tasklists:'=', project:'=', title:'@tasklistTitle'},
      templateUrl:'views/tasklist-template.html' ,
      controller: TasklistTemplateCtrl,
      link: function(scope, element, attrs) {
      }
    };
}).directive('task', function(){
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {task:'=', tasklist:'=', project:'=', title:'@taskTitle'},
      templateUrl:'views/task-template.html', //+'?t='+ now.getTime(),
      controller: TaskTemplateCtrl,
      link: function(scope, element, attrs) {

      }
    };
});


Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

function findArrayIndex(array, id){
  var index = -1;
  var len = array.length;
  for(var i=0; i<len; i++){
    if (id == array[i].id){
      index = i;
      break;
    }
  }
  return index;
}

function ProjectListCtrl($scope, Project) {
  $scope.projects = {};

  Project.query(function(json){
    if(json.stat == 'ok')
    {
      json.projects.forEach(function(project){
        $scope.projects[project.id] = project;
      });
    }
  });

  $scope.newProject = new Project();
  $scope.orderProp = '-id';

  $scope.save = function() {
    
    var post_data = {title: $scope.newProject.title};
    alert(post_data.title);
    Project.save(post_data, function(json) {
        if(json.stat == 'ok'){
          hide("projectForm");
          $scope.projects[json.project.id] = json.project;
          $scope.newProject = new Project();
        }
    });
  };

  $scope.delete = function(id){



    Project.remove({id:id}, function(json){
      if(json.stat == 'ok'){
        delete $scope.projects[json.project.id];
      }
    });
  };

}

function UserListCtrl($scope, User) {

}



function ProjectDetailCtrl($scope, $http, $location,  $routeParams, Project, TaskList, Task) {
  $scope.orderProp = 'id';

  Project.get({id: $routeParams.projectId}, function(json) {
    $scope.model = json;
    $scope.projectId = $routeParams.projectId;
    $scope.newTasklist = new TaskList();
    $scope.project = json.project;
    $scope.tasks = {};
    $scope.tasklists = [];
    for(var k in json.tasklists){
      var v = json.tasklists[k];
      $scope.tasklists.push(json.tasklists[k]);
    }

     
  });

  $scope.saveTaskList = function(){

    var post_data = {title: $scope.newTasklist.title, 
      projectId: $scope.projectId};
    if($scope.newTasklist.title==undefined){
      return;
    }
      
    TaskList.save(post_data, function(json){
        if(json.stat == "ok")
        {
          hide("tasklistForm");
          // $scope.tasklists[json.tasklist.id] = json.tasklist;
          $scope.tasklists.push(json.tasklist);
        }
      });
  };
  
}

 

function TaskListDetailCtrl($scope, $routeParams, TaskList, Task) {
  TaskList.get({projectId: $routeParams.projectId, tasklistId: $routeParams.tasklistId}, function(json) {
      if(json.stat == 'ok'){
        $scope.tasklist = json.tasklist;
        $scope.project = json.project;
      }else{

      }
  });

}

function TaskDetailCtrl($scope, $routeParams, Task) {
  Task.get({projectId: $routeParams.projectId, taskId: $routeParams.taskId}, function(json) {
    if(json.stat == 'ok'){
      $scope.project = json.project;
      $scope.task = json.task;
    }else{

    }
  });

}


function TasklistTemplateCtrl($scope, $http, $routeParams, Task){
  $scope.newTask = new Task();


  $scope.taskSave = function(){
    var post_data = {title: $scope.newTask.title, 
        projectId: $scope.project.id, tasklistId: $scope.tasklist.id };
    if($scope.newTask.title==undefined){
      return;
    }
    Task.save(post_data, function(json){
      if(json.stat == "ok"){
          $scope.newTask = new Task();
          hide("taskForm"+$scope.tasklist.id);
          if($scope.tasklist.tasks == undefined){
            $scope.tasklist.tasks = [json.task];
          }else
          {
            $scope.tasklist.tasks.push(json.task);
          }
        }
    });
  };

  $scope.tasklistDelete = function(){
      var r=confirm("Are you sure you want to delete this tasklist?");
      if (r!=true)
      {
        return;
      }
      var tasklistId = $scope.tasklist.id;
      var projectId = $scope.project.id;
      $http({method: 'DELETE', url: "/tasklists/"+$scope.tasklist.id, data:{projectId: $scope.project.id}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            if($scope.tasklists == null){
              window.location = "#/projects/"+projectId;
            }
            else{
              var tls = $scope.tasklists;
              var index = findArrayIndex(tls, $scope.tasklist.id);
              if (index != -1){
                Array.remove(tls, index);
              }
            }
          }
        }).
        error(function(json, status) {
         
      });
    };


  $scope.tasklistUpdate = function(){
      var title = $scope.title;
      $http({method: 'PUT', url: "/tasklists/"+$scope.tasklist.id, data: {title: $scope.title, projectId: $scope.tasklist.projectId}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            $scope.tasklist.title = $scope.title;
            hide("tasklistEditForm"+$scope.tasklist.id);
          }
        }).
        error(function(json, status) {
         
      });
  };


}





function TaskTemplateCtrl($scope, $http, $routeParams, Task){

  $scope.taskDone = function(task){
      $http({method: 'PUT', url: "/tasks/"+task.id, data: {projectId: $scope.project.id, status: task.status}}).
        success(function(data, status) {
          if(data.stat == "ok"){

          }
        }).
        error(function(data, status) {
         
      });
    };

  $scope.taskDelete = function(){
      var r=confirm("Are you sure you want to delete this task?");
      if (r!=true)
      {
        return;
      }
      var tasklistId = $scope.task.tasklistId;
      var taskId = $scope.task.id;
      var projectId = $scope.task.id;
      $http({method: 'DELETE', url: "/tasks/"+taskId, data:{projectId: projectId}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            if($scope.tasklist == null){
              window.location = "#/projects/"+$scope.project.id+"/tasklists/"+tasklistId;
            }
            else{
              var tls = $scope.tasklist;
              var index = findArrayIndex(tls.tasks, taskId);
              if (index != -1){
                Array.remove(tls.tasks, index);
              }
            }
          }
        }).
        error(function(json, status) {
         
      });
    };



   $scope.taskUpdate = function(task){
      var title = $scope.title;
      if(title == "" || title == null){
        return;
      }

      $http({method: 'PUT', url: "/tasks/"+task.id, data: {title: title, projectId:task.projectId, tasklistId: task.tasklistId}}).
        success(function(json, status) {
          if(json.stat == "ok"){
            $scope.task.title = $scope.title;
            hide("taskEditForm"+$scope.task.id);
          }
          
        }).
        error(function(json, status) {
         
      });
  };
  

}




angular.module('projectServices', ['ngResource']).
    factory('Project', function($resource){
        var Project = $resource('projects/:id',{},
            {
                get: {method:'GET', params:{id: ''}},
                query: {method:'GET', params:{id: ''}},
                update: {method: 'PUT'}
            });

        Project.prototype.update = function(cb){
            return Project.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Project.prototype.destroy = function(cb) {
            return Project.remove({id: this._id.$oid}, cb);
          };

        return Project;

    });

angular.module('tasklistServices', ['ngResource']).
    factory('TaskList', function($resource){
        var TaskList = $resource('tasklists/:tasklistId', {}, {
            get: {method:'GET', params:{tasklistId: ''}},
            query: {method:'GET', params:{tasklistId: ''}, isArray:true},
            update: {method: 'PUT'},
            save: {method: 'POST', params:{id:''}},
        });

        TaskList.prototype.save = function(cb){
            alert(this._id.$oid);
            return TaskList.save({id: this._id.$oid},
                    angular.extend({}, this, {_id:undefined}), cb);

        };

        TaskList.prototype.update = function(cb){
            alert(this._id.$oid);
            return TaskList.update({id: this._id.$oid},
                    angular.extend({}, this, {_id:undefined}), cb);

        };

        TaskList.prototype.destroy = function(cb) {
            return TaskList.remove({id: this._id.$oid}, cb);
        };

        return TaskList;
    });

angular.module('taskServices', ['ngResource']).
    factory('Task', function($resource){
        var Task = $resource('tasks/:taskId', {}, {
            query: {method:'GET', params:{taskId: ''}, isArray:true}
        });


        // Task.prototype.update = function(cb){
        //     alert(this._id.$oid);
        //     return Task.update({id: this._id.$oid},
        //             angular.extend({}, this, {_id:undefined}), cb);

        // };

        // Task.prototype.destroy = function(cb) {
        //     return Task.remove({id: this._id.$oid}, cb);
        // };

        return Task;

    });

angular.module('userServices', ['ngResource']).
    factory('User', function($resource){
        var User = $resource('users/:userId', {}, {
            query: {method:'GET', params:{userId: ''}, isArray:true}
        });


        // User.prototype.update = function(cb){
        //     alert(this._id.$oid);
        //     return User.update({id: this._id.$oid},
        //             angular.extend({}, this, {_id:undefined}), cb);

        // };

        // User.prototype.destroy = function(cb) {
        //     return User.remove({id: this._id.$oid}, cb);
        // };

        return User;

    });




angular.module('projectFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});



function show(id){
  $("#"+id).show();
  $("#add_"+id).hide();
  $("#input_"+id).val("");
  $("#input_"+id).select();
  return false;
}
function hide(id){
  $("#"+id).hide();
  $("#add_"+id).show();
  return false;
}
$("div.hoverable").live({
mouseenter: 
  function () {
    $(this).find(".hide-actions").show();
  },
mouseleave:
function () {
    $(this).find(".hide-actions").hide();
  }
});

