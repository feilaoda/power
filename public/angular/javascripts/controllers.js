

function PhoneListCtrl($scope, Project) {
  $scope.projects = Project.query();
  $scope.orderProp = 'id';
}


function ProjectDetailCtrl($scope, $location,  $routeParams, Project, TaskList, Task, Token) {
  $scope.orderProp = '-id';

  Token.get(function(model){
    $scope.csrfToken = model.token;
  });

  Project.get({projectId: $routeParams.projectId}, function(model) {
    $scope.model = model;
    // $scope.token = model.token;
    $scope.projectId = model.project.id;
    $scope.tasklist = new TaskList({project_id:model.project.id});
  });

 

  $scope.saveTaskList = function(){

    var data = {title: $scope.tasklist.title, authenticity_token: $scope.csrfToken,
      projectId: $scope.projectId};

    alert(data.title+ data.projectId);

    TaskList.save(data, function(tasklist){
        $("#tasklistForm").hide();
    });
  }

  $scope.createTask = function(){
    TaskList.save($scope.task, function(tasklist){
        //callback
    });
  }

}

function ProjectCreateCtrl($scope, $location, Project) {
  $scope.save = function() {
    Project.save($scope.project, function(project) {
        
    });
  }
}


function TaskListDetailCtrl($scope, $routeParams, TaskList) {
  $scope.model = TaskList.get({projectId: $routeParams.projectId, tasklistId: $routeParams.tasklistId}, function(project) {

  });
}

function TaskDetailCtrl($scope, $routeParams, Task) {
  $scope.model = Task.get({projectId: $routeParams.projectId, taskId: $routeParams.taskId}, function(project) {
  });

}
