

function PhoneListCtrl($scope, Project) {
  $scope.projects = Project.query();
  $scope.orderProp = 'id';
}


function ProjectDetailCtrl($scope, $http, $location,  $routeParams, Project, TaskList, Task, Token) {
  $scope.orderProp = 'id';

  $scope.csrfToken = $("input[name='authenticity_token']").val();

  // Token.get(function(model){
  //   $scope.csrfToken = model.token;
  // });

  Project.get({projectId: $routeParams.projectId}, function(model) {
    $scope.model = model;
    // $scope.token = model.token;
    $scope.projectId = model.project.id;
    $scope.newTasklist = new TaskList();
    $scope.tasks = {};
    $scope.tasklists = [];
    for(var k in model.tasklists){
      var v = model.tasklists[k];
      $scope.tasks[v.id] = new Task();
      $scope.tasklists.push(v);
    }
   
  });

  $scope.form_invalid = function(index){
    return "taskForm"+index+".title.$error.required";
  };

  $scope.saveTaskList = function(){
    var data = {title: $scope.newTasklist.title, authenticity_token: $scope.csrfToken,
      projectId: $scope.projectId};
      TaskList.save(data, function(tasklist){
          $("#tasklistForm").hide();
          $scope.tasks[tasklist.id] = new Task();
      });
  };

  $scope.saveTask = function(tasklistId){
    
    var post_data = {title: $scope.tasks[tasklistId].title, authenticity_token: $scope.csrfToken,
        projectId: $scope.projectId, tasklistId: tasklistId };
    
    $http({method: 'POST', url: "/api/tasks", data: post_data}).
      success(function(data, status) {
        if(data.stat == "ok"){
          $("#taskForm"+tasklistId).hide();
        }
        
      }).
      error(function(data, status) {
       
    });
  };



}

function ProjectCreateCtrl($scope, $location, Project) {
  $scope.save = function() {
    Project.save($scope.project, function(project) {
        
    });
  }
}


function TaskListDetailCtrl($scope, $routeParams, TaskList, Task, Token) {
  $scope.projectId = $routeParams.projectId;
  $scope.tasklistId = $routeParams.tasklistId;

  Token.get(function(model){
    $scope.csrfToken = model.token;
  });


  TaskList.get({projectId: $routeParams.projectId, tasklistId: $routeParams.tasklistId}, function(model) {
      $scope.model = model;
      // $scope.token = model.token;
      // $scope.projectId = model.project.id;
      // $scope.tasklistId = $routeParams.tasklistId;
      $scope.task = new Task();

  });

  $scope.saveTask = function(){
    var data = {title: $scope.task.title, authenticity_token: $scope.csrfToken,
        projectId: $scope.projectId, tasklistId: $scope.tasklistId };
    Task.save(data, function(task){
        //callback
        $("#taskForm").hide();
    });
  }

}

function TaskDetailCtrl($scope, $routeParams, Task) {
  $scope.model = Task.get({projectId: $routeParams.projectId, taskId: $routeParams.taskId}, function(project) {
  });

}
