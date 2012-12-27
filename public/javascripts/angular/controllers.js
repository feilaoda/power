

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
    $scope.tasklists = json.tasklists;
    
    for(var k in json.tasklists){
      var v = json.tasklists[k];
      $scope.tasks[v.id] = new Task();
    }

     
  });

  $scope.taskDone = function(tasklistId, task){
    $http({method: 'POST', url: "/tasks/"+task.id+"/changes", data: {status: task.status}}).
      success(function(data, status) {
        if(data.stat == "ok"){
          hide("taskForm"+tasklistId);
          //$("#taskForm"+tasklistId).hide();
        }
        
      }).
      error(function(data, status) {
       
    });
  };

  $scope.saveTaskList = function(){

    var post_data = {title: $scope.newTasklist.title, 
      projectId: $scope.projectId};
    if($scope.newTasklist.title==undefined){
      return;
    }
      
    TaskList.save(post_data, function(json){
        if(json.stat == "ok")
        {
          $("#tasklistForm").hide();
          $scope.tasks[json.tasklist.id] = new Task();
          $scope.tasklists[json.tasklist.id] = json.tasklist;
        }
      });
  };

  $scope.saveTask = function(tasklistId){
    
    var post_data = {title: $scope.tasks[tasklistId].title, 
        projectId: $scope.projectId, tasklistId: tasklistId };

    if($scope.tasks[tasklistId].title==undefined){
      return;
    }

    Task.save(post_data, function(json){
        if(json.stat == "ok"){
          $scope.tasks[tasklistId].title = undefined;
          hide("taskForm"+tasklistId);

          if($scope.tasklists[tasklistId].tasks == undefined){
            $scope.tasklists[tasklistId].tasks = [json.task];
          }else
          {
            $scope.tasklists[tasklistId].tasks.push(json.task);
          }
        }
    });

  };



}

 

function TaskListDetailCtrl($scope, $routeParams, TaskList, Task) {
  $scope.projectId = $routeParams.projectId;
  $scope.tasklistId = $routeParams.tasklistId;


  TaskList.get({projectId: $routeParams.projectId, tasklistId: $routeParams.tasklistId}, function(json) {
      $scope.tasklist = json.tasklist;
      $scope.projectId = $routeParams.projectId;
      $scope.tasklistId = $routeParams.tasklistId;
      $scope.newTask = new Task();
  });

  $scope.saveTask = function(){
    var post_data = {title: $scope.newTask.title, 
        projectId: $scope.projectId, tasklistId: $scope.tasklistId };
    if($scope.newTask.title==undefined){
      return;
    }

    Task.save(post_data, function(json){
        //callback
        if(json.stat == "ok"){
          $scope.task = new Task();
          hide("taskForm");
          if($scope.tasklist.tasks == undefined){
            $scope.tasklist.tasks = [json.task];
          }else
          {
            $scope.tasklist.tasks.push(json.task);
          }
        }
    });
  }

}

function TaskDetailCtrl($scope, $routeParams, Task) {
  $scope.projectId = $routeParams.projectId;
  Task.get({projectId: $routeParams.projectId, taskId: $routeParams.taskId}, function(json) {
    $scope.task = json.task;
  });

}
